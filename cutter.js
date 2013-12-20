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
	function buy_best_value_object() {
		var best_value = Game.ObjectsById.sort( function( a, b ) {
			return ( a.price / a.storedCps ) - ( b.price / b.storedCps );
		})[0];
		if( best_value.price <= Game.cookies ) {
			best_value.buy();
			return true;
		} else {
			return false;
		}
	}
	function click_cookie() {
		Game.ClickCookie();
		return true;
	}
	clearInterval( window.cutter_timer );
	window.cutter_timer = setInterval( function() {
		t++;
		click_golden_cookie() || buy_best_value_object() || click_cookie();
		progress();
	}, 250);
})();
