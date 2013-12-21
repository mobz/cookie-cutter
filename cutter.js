(function() {
	var t = 0;
	var cutter = window.Cutter = {
		Progress: []
	};
	function progress() {
		cutter.Progress[ Math.floor(t / 4000) ] = {
			t: t,
			cookiesEarned: Game.cookiesEarned,
			goldenClicks: Game.goldenClicks,
			AchievementsOwned: Game.AchievementsOwned,
			BuildingsOwned: Game.BuildingsOwned
		};
	}
	var ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND = 3.9;
	var postfix = " KMGTPEY".split("");
	function price( k, sym ) {
		var i = 0, pref = ( k < 0 ? "-" : " " ) + sym;
		k = Math.abs( k );
		while( k > 1000 ) {
			k /= 1000;
			i++;
		}
		var r = k.toFixed(1);
		switch(r.length) {
			case 6: return pref + "  " + (k/1000).toFixed(1) + postfix[i+1];
			case 5: return pref + "" + k.toFixed(1) + postfix[i];
			case 4: return pref + " " + k.toFixed(1) + postfix[i];
			case 3: return pref + "  " + k.toFixed(1) + postfix[i];
		}
	}
	function time( t ) {
		var sign = t < 0 ? "-" : " ";
		t = Math.abs( t );
		var s = parseInt( t % 60, 10 );
		var m = parseInt(( (t % 3600 ) / 60 ), 10);
		var h = parseInt(( t / 3600 ), 10 );
		var r = sign + h + ":" + ( m < 10 ? "0": "" ) + m + ":" + ( s < 10 ? "0": "" ) + s;
		while( r.length < 8 ) {
			r = " " + r;
		}
		return r;
	}
	function log_purchase( item, reason ) {
		console.log( "buy (" + reason + ")", price( item.price, "$" ), price( item.cps, "@" ), time( item.value ), item.name );
	}

	function click_golden_cookie() {
		if( document.getElementById("goldenCookie").style.display === "block" ) {
			Game.goldenCookie.click();
			return true;
		} else {
			return false;
		}
	}
	function calc_upgrade_cps( ug ) {
		ug.bought = true;
		Game.CalculateGains();
		var cps = Game.cookiesPs;
		ug.bought = false;
		return cps;
	}
	function calc_object_cps( obj ) {
		obj.amount++;
		Game.CalculateGains();
		var cps = Game.cookiesPs;
		obj.amount--;
		return cps;
	}
	function get_items() {
		var orig_cps = Game.cookiesPs;
		var items = Game.UpgradesInStore.map( function( ug ) {
			var cps = calc_upgrade_cps( ug ) - orig_cps;
			return { buy: ug.buy.bind( ug ), name: ug.name,	price: ug.basePrice, cps: cps, value: ug.basePrice / cps };
		}).concat( Game.ObjectsById.map( function( obj ) {
			var cps = calc_object_cps( obj ) - orig_cps;
			return { buy: obj.buy.bind( obj ), name: obj.name, price: obj.price, cps: obj.storedCps, value: obj.price / obj.storedCps };
		}) ).sort( function( a, b ) {
			return a.value - b.value;
		});
		Game.CalculateGains();
		return items;
	}
	function buy_item() {
		var gCps = Game.cookiesPs;
		var gCookies = Game.cookies;
		var items = get_items();
		var best_item = items[0];
		if( best_item.price <= gCookies ) {
			log_purchase( best_item, "best" );
			best_item.buy();
			return true;
		} else {
			var time_to_buy = ( best_item.price - gCookies ) / gCps;
			var optimal = items
				.filter( function( item ) {
					return item.price <= gCookies;
				} ).sort( function( a, b ) {
					return (a.price - ( a.cps * time_to_buy )) - (b.price - ( b.cps * time_to_buy ));
				} )[0];
			if( optimal && ( optimal.cps * time_to_buy ) > optimal.price ) {
				log_purchase( optimal, "opti" );
				optimal.buy();
				return true;
			}
		}
	}
	function click_cookie() {
		Game.ClickCookie();
		return true;
	}
	clearInterval( window.cutter_timer );
	window.cutter_timer = setInterval( function() {
		t++;
		click_golden_cookie() || buy_item() || click_cookie();
		progress();
	}, 250);
})();
