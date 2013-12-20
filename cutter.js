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
	function non_cursor_items_owned() {
		return Game.BuildingsOwned - Game.Objects["Cursor"].amount;
	}
	var upgrades_cps = {
		0: function() { return ( Game.Objects["Cursor"].amount * 0.1 ) + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND); },
		1: function() { return ( Game.Objects["Cursor"].storedCps * 2 ) + ( Game.computedMouseCps * 2 * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ); },
		2: function() { return ( Game.Objects["Cursor"].storedCps * 2 ) + ( Game.computedMouseCps * 2 * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ); },
		3: function() { return 0.1 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		4: function() { return 0.5 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		5: function() { return 2 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		6: function() { return 10 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		7: function() { return Game.Objects["Grandma"].amount * 0.3; },
		8: function() { return Game.Objects["Grandma"].storedCps * 2; },
		9: function() { return Game.Objects["Grandma"].storedCps * 2; },
		10: function() { return Game.Objects["Farm"].amount; },
		11: function() { return Game.Objects["Farm"].storedCps * 2; },
		12: function() { return Game.Objects["Farm"].storedCps * 2; },
		13: function() { return Game.Objects["Factory"].amount * 4; },
		14: function() { return Game.Objects["Factory"].storedCps * 2; },
		15: function() { return Game.Objects["Factory"].storedCps * 2; },
		16: function() { return Game.Objects["Mine"].amount * 10; },
		17: function() { return Game.Objects["Mine"].storedCps * 2; },
		18: function() { return Game.Objects["Mine"].storedCps * 2; },
		19: function() { return Game.Objects["Shipment"].amount * 30; },
		20: function() { return Game.Objects["Shipment"].storedCps * 2; },
		21: function() { return Game.Objects["Shipment"].storedCps * 2; },
		22: function() { return Game.Objects["Alchemy lab"].amount * 100; },
		23: function() { return Game.Objects["Alchemy lab"].storedCps * 2; },
		24: function() { return Game.Objects["Alchemy lab"].storedCps * 2; },
		25: function() { return Game.Objects["Portal"].amount * 1666; },
		26: function() { return Game.Objects["Portal"].storedCps * 2; },
		27: function() { return Game.Objects["Portal"].storedCps * 2; },
		28: function() { return Game.Objects["Time machine"].amount * 9876; },
		29: function() { return Game.Objects["Time machine"].storedCps * 2; },
		30: function() { return Game.Objects["Time machine"].storedCps * 2; },
		31: function() { return Game.cookiesPs * ( 0.05 * Game.AchievementsOwned / 97 ); },
		32: function() { return Game.cookiesPs * ( 0.1 * Game.AchievementsOwned / 97 ); },
		33: function() { return Game.cookiesPs * 0.05; },
		34: function() { return Game.cookiesPs * 0.05; },
		35: function() { return Game.cookiesPs * 0.05; },
		36: function() { return Game.cookiesPs * 0.05; },
		37: function() { return Game.cookiesPs * 0.05; },
		38: function() { return Game.cookiesPs * 0.05; },
		39: function() { return Game.cookiesPs * 0.1; },
		40: function() { return Game.cookiesPs * 0.05; },
		41: function() { return Game.cookiesPs * 0.1; },
		42: function() { return Game.cookiesPs * 0.1; },
		43: function() { return 20 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		44: function() { return Game.Objects["Grandma"].storedCps * 2; },
		45: function() { return Game.Objects["Farm"].storedCps * 2; },
		46: function() { return Game.Objects["Factory"].storedCps * 2; },
		47: function() { return Game.Objects["Mine"].storedCps * 2; },
		48: function() { return Game.Objects["Shipment"].storedCps * 2; },
		49: function() { return Game.Objects["Alchemy lab"].storedCps * 2; },
		50: function() { return Game.Objects["Portal"].storedCps * 2; },
		51: function() { return Game.Objects["Time machine"].storedCps * 2; },
		52: function() { return 0; }, // Golden cookie multiplier x 2
		53: function() { return 0; }, // Golden cookie multiplier x 2
		54: function() { return Game.cookiesPs * ( 0.2 * Game.AchievementsOwned / 97 ); },
		55: function() { return Game.cookiesPs * 0.15; },
		56: function() { return Game.cookiesPs * 0.15; },
		57: function() { return Game.Objects["Grandma"].storedCps * 2; },
		58: function() { return Game.Objects["Grandma"].storedCps * 2; },
		59: function() { return Game.Objects["Grandma"].storedCps * 2; },
		60: function() { return Game.Objects["Grandma"].storedCps * 2; },
		61: function() { return Game.Objects["Grandma"].storedCps * 2; },
		62: function() { return Game.Objects["Grandma"].storedCps * 2; },
		63: function() { return Game.Objects["Grandma"].storedCps * 2; },
		64: function() { return Game.Objects["Grandma"].storedCps * 4; }, // Bingo research center - increases upgrade unlock rate
		65: function() { return Game.cookiesPs * 0.01; },
		66: function() { return Game.cookiesPs * 0.02; },
		67: function() { return Game.Objects["Grandma"].storedCps * 2; },
		68: function() { return Game.cookiesPs * 0.03; },
		69: function() { return Game.Objects["Grandma"].amount * Game.Objects["Gramdma"].amount / 50; },
		70: function() { return Game.cookiesPs * 0.04; },
		71: function() { return Game.Objects["Grandma"].amount * Game.Objects["Gramdma"].amount / 50; },
		72: function() { return Game.cookiesPs * 0.05; },
		73: function() { return Game.Objects["Grandma"].amount * Game.Objects["Portal"].amount / 20; },
		74: function() { return 0; }, // Contain elder wrath
		75: function() { return 0.01 * Game.Objects["Cursor"].amount * Game.cookiePs * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND; },
		76: function() { return 0.01 * Game.Objects["Cursor"].amount * Game.cookiePs * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND; },
		77: function() { return 0.01 * Game.Objects["Cursor"].amount * Game.cookiePs * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND; },
		78: function() { return 0.01 * Game.Objects["Cursor"].amount * Game.cookiePs * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND; },
		79: function() { return 0; }, // research takes 5 seconds
		80: function() { return Game.cookiesPs * 0.15; },
		81: function() { return Game.cookiesPs * 0.15; },
		82: function() { return 100 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		83: function() { return 0; }, // golden cookies appear really often
		84: function() { return 0; }, // end elder wrath
		85: function() { return 0; }, // start elder wrath
		86: function() { return 0; }, // golden cookies last twice as long
		87: function() { return 0; }, // elder pledge lasts twice as long
		88: function() { return Game.cookiesPs * 0.15; },
		89: function() { return Game.cookiesPs * 0.15; },
		90: function() { return Game.cookiesPs * 0.15; },
		91: function() { return 0; }, // toggle upgrades on and off
		92: function() { return Game.cookiesPs * 0.15; },
		93: function() { return Game.cookiesPs * 0.15; },
		94: function() { return Game.cookiesPs * 0.15; },
		95: function() { return Game.cookiesPs * 0.15; },
		96: function() { return Game.cookiesPs * 0.15; },
		97: function() { return Game.cookiesPs * 0.15; },
		98: function() { return Game.cookiesPs * 0.15; },
		99: function() { return Game.Objects["Antimatter condenser"].amount * 99999; },
		100: function() { return Game.Objects["Antimatter condenser"].storedCps * 2; },
		101: function() { return Game.Objects["Antimatter condenser"].storedCps * 2; },
		102: function() { return Game.Objects["Antimatter condenser"].storedCps * 2; },
		103: function() { return Game.Objects["Grandma"].storedCps * 2; },
		104: function() { return Game.cookiesPs * 0.20; },
		105: function() { return Game.cookiesPs * 0.20; },
		106: function() { return Game.cookiesPs * 0.20; },
		107: function() { return Game.cookiesPs * 0.20; },
		108: function() { return Game.cookiesPs * ( 0.2 * Game.AchievementsOwned / 97 ); },
		109: function() { return 200 * non_cursor_items_owned() * ( Game.Objects["Cursor"].amount + ( Game.computedMouseCps * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND ) ); },
		110: function() { return Game.Objects["Grandma"].storedCps * 2; },
		111: function() { return Game.Objects["Farm"].storedCps * 2; },
		112: function() { return Game.Objects["Factory"].storedCps * 2; },
		113: function() { return Game.Objects["Mine"].storedCps * 2; },
		114: function() { return Game.Objects["Shipment"].storedCps * 2; },
		115: function() { return Game.Objects["Alchemy lab"].storedCps * 2; },
		116: function() { return Game.Objects["Portal"].storedCps * 2; },
		117: function() { return Game.Objects["Time machine"].storedCps * 2; },
		118: function() { return Game.Objects["Antimatter condenser"].storedCps * 2; },
		119: function() { return 0.01 * Game.cookiePs * ESTIMATED_BIG_COOKIE_CLICKS_PER_SECOND; },
		120: function() { return Game.cookiesPs * 0.25; },
		121: function() { return Game.cookiesPs * 0.25; },
		122: function() { return Game.cookiesPs * 0.25; },
		123: function() { return Game.cookiesPs * 0.25; },
		124: function() { return 0; }, // produce cookies when closed
		125: function() { return Game.cookiesPs * 0.25; },
		126: function() { return Game.cookiesPs * 0.25; },
		127: function() { return Game.cookiesPs * 0.25; },
		128: function() { return Game.cookiesPs * 0.25; },
		129: function() { return 0; }, // heavenly chips 5%
		130: function() { return 0; }, // heavenly chips 25%
		131: function() { return 0; }, // heavenly chips 50%
		132: function() { return 0; }, // heavenly chips 75%
		133: function() { return 0; }, // heavenly chips 100%
		134: function() { return Game.cookiesPs * 0.20; },
		135: function() { return Game.cookiesPs * 0.20; },
		136: function() { return Game.cookiesPs * 0.20; },
		137: function() { return Game.cookiesPs * 0.20; },
		138: function() { return Game.cookiesPs * 0.20; },
		139: function() { return Game.cookiesPs * 0.20; },
		140: function() { return Game.cookiesPs * 0.20; },
		141: function() { return 0; }, // research 10 times faster
		142: function() { return 0; } // wrinklers spawn more frequently
	};
	function click_golden_cookie() {
		if( document.getElementById("goldenCookie").style.display !== "none" ) {
			Game.goldenCookie.click();
			return true;
		} else {
			return false;
		}
	}
	function get_items() {
		var items = Game.UpgradesInStore.map( function( ug ) {
			var cps = upgrades_cps[ ug.id ]();
			return { buy: ug.buy.bind( ug ), name: ug.name,	price: ug.basePrice, cps: cps, value: ug.basePrice / cps };
		}).concat( Game.ObjectsById.map( function( obj ) {
			return { buy: obj.buy.bind( obj ), name: obj.name, price: obj.price, cps: obj.storedCps, value: obj.price / obj.storedCps };
		}) ).sort( function( a, b ) {
			return a.value - b.value;
		});
		return items;
	}
	function buy_item() {
		var gCps = Game.cookiesPs;
		var gCookies = Game.cookies;
		var items = get_items();
		var best_item = items[0];
		if( best_item.price <= gCookies ) {
			console.log( "buying (best)", best_item.name, parseInt(best_item.price, 10), "@", parseInt(best_item.cps, 10), "#", parseInt(best_item.value, 10) );
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
				console.log( "buying (opti)", optimal.name, parseInt(optimal.price, 10), "@", parseInt(optimal.cps, 10), "#", parseInt(optimal.value, 10) );
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
