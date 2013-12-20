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
	function click_golden_cookie() {
		if( document.getElementById("goldenCookie").style.display !== "none" ) {
			Game.goldenCookie.click();
			return true;
		} else {
			return false;
		}
	}
	function buy_optimal_object() {
		var best_value = Game.ObjectsById.sort( function( a, b ) {
			return ( a.price / a.storedCps ) - ( b.price / b.storedCps );
		})[0];
		if( best_value.price <= Game.cookies ) {
			console.log( "buying best value", best_value.name, "for", best_value.price );
			best_value.buy();
			return true;
		} else {
			var time_to_buy = ( best_value.price - Game.cookies ) / Game.cookiesPs;
			var optimal = Game.ObjectsById
				.filter( function(obj ) {
					return obj.price <= Game.cookies;
				}).sort( function( a, b ) {
					return (a.price - ( a.storedCps * time_to_buy )) - (b.price - ( b.storedCps * time_to_buy ));
				})[0];
			if( optimal && ((optimal.storedCps * time_to_buy ) > optimal.price )) {
				console.log( "buying optimal", optimal.name, optimal.storedCps, time_to_buy, optimal.storedCps * time_to_buy, optimal.price );
				optimal.buy();
				return true;
			}
		}
		return false;
	}
	function click_cookie() {
		Game.ClickCookie();
		return true;
	}
	clearInterval( window.cutter_timer );
	window.cutter_timer = setInterval( function() {
		t++;
		click_golden_cookie() || buy_optimal_object() || click_cookie();
		progress();
	}, 250);
})();
