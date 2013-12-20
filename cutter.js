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
	function buy_cheapest_object() {
		var cheapest = Game.ObjectsById.sort( function( a, b ) {
			return a.price - b.price;
		})[0];
		if( cheapest.price <= Game.cookies ) {
			cheapest.buy();
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
		buy_cheapest_object() || click_cookie();
		progress();
	}, 250);
})();
