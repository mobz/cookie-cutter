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
	function get_cookie() {
		Game.ClickCookie();
		return true;
	}
	clearInterval( window.cutter_timer );
	window.cutter_timer = setInterval( function() {
		t++;
		get_cookie();
		progress();
	}, 250);
})();
