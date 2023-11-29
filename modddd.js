Date.now || (Date.now = function() {
	return (new Date.getTime())
}),
function() {
	"use strict";
	for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
		var i = t[e];
		window.requestAnimationFrame = window[i + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
	}
	if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
		var s = 0;
		window.requestAnimationFrame = function(t) {
			var e = Date.now(),
				i = Math.max(s + 16, e);
			return setTimeout(function() {
				t(s = i)
			}, i - e)
		}, window.cancelAnimationFrame = clearTimeout
	}
}(),
function(t) {
	t.snowfall = function(e, i) {
		function s(s, n, a, r) {
			this.x = s, this.y = n, this.size = a, this.speed = r, this.step = 0, this.stepSize = h(1, 10) / 100, i.collection && (this.target = m[h(0, m.length - 1)]);
			var p = null;
			i.image ? (p = document.createElement("img"), p.src = i.image) : (p = document.createElement("div"), t(p).css({
				background: i.flakeColor
			})), t(p).attr({
				"class": "snowfall-flakes"
			}).css({
				width: this.size,
				height: this.size,
				position: i.flakePosition,
				top: this.y,
				left: this.x,
				fontSize: 0,
				zIndex: i.flakeIndex
			}), t(e).get(0).tagName === t(document).get(0).tagName ? (t("body").append(t(p)), e = t("body")) : t(e).append(t(p)), this.element = p, this.update = function() {
				if (this.y += this.speed, this.y > l - (this.size + 6) && this.reset(), this.element.style.top = this.y + "px", this.element.style.left = this.x + "px", this.step += this.stepSize, y === !1 ? this.x += Math.cos(this.step) : this.x += y + Math.cos(this.step), i.collection && this.x > this.target.x && this.x < this.target.width + this.target.x && this.y > this.target.y && this.y < this.target.height + this.target.y) {
					var t = this.target.element.getContext("2d"),
						e = this.x - this.target.x,
						s = this.y - this.target.y,
						n = this.target.colData;
					if (void 0 !== n[parseInt(e)][parseInt(s + this.speed + this.size)] || s + this.speed + this.size > this.target.height) if (s + this.speed + this.size > this.target.height) {
						for (; s + this.speed + this.size > this.target.height && this.speed > 0;) this.speed *= .5;
						t.fillStyle = o.flakeColor, void 0 == n[parseInt(e)][parseInt(s + this.speed + this.size)] ? (n[parseInt(e)][parseInt(s + this.speed + this.size)] = 1, t.fillRect(e, s + this.speed + this.size, this.size, this.size)) : (n[parseInt(e)][parseInt(s + this.speed)] = 1, t.fillRect(e, s + this.speed, this.size, this.size)), this.reset()
					} else this.speed = 1, this.stepSize = 0, parseInt(e) + 1 < this.target.width && void 0 == n[parseInt(e) + 1][parseInt(s) + 1] ? this.x++ : parseInt(e) - 1 > 0 && void 0 == n[parseInt(e) - 1][parseInt(s) + 1] ? this.x-- : (t.fillStyle = o.flakeColor, t.fillRect(e, s, this.size, this.size), n[parseInt(e)][parseInt(s)] = 1, this.reset())
				}(this.x + this.size > d - c || this.x < c) && this.reset()
			}, this.reset = function() {
				this.y = 0, this.x = h(c, d - c), this.stepSize = h(1, 10) / 100, this.size = h(100 * i.minSize, 100 * i.maxSize) / 100, this.element.style.width = this.size + "px", this.element.style.height = this.size + "px", this.speed = h(i.minSpeed, i.maxSpeed)
			}
		}
		function n() {
			for (r = 0; r < a.length; r += 1) a[r].update();
			p = requestAnimationFrame(function() {
				n()
			})
		}
		var a = [],
			o = {
				flakeCount: 35,
				flakeColor: "#ffffff",
				flakePosition: "absolute",
				flakeIndex: 999999,
				minSize: 1,
				maxSize: 2,
				minSpeed: 1,
				maxSpeed: 5,
				round: !1,
				shadow: !1,
				collection: !1,
				collectionHeight: 40,
				deviceorientation: !1
			}, i = t.extend(o, i),
			h = function(t, e) {
				return Math.round(t + Math.random() * (e - t))
			};
		t(e).data("snowfall", this);
		var r = 0,
			l = t(e).height(),
			d = t(e).width(),
			c = 0,
			p = 0;
		if (i.collection !== !1) {
			var f = document.createElement("canvas");
			if (f.getContext && f.getContext("2d")) for (var m = [], w = t(i.collection), g = i.collectionHeight, r = 0; r < w.length; r++) {
				var u = w[r].getBoundingClientRect(),
					x = t("<canvas/>", {
						"class": "snowfall-canvas"
					}),
					z = [];
				if (u.top - g > 0) {
					t("body").append(x), x.css({
						position: i.flakePosition,
						left: u.left + "px",
						top: u.top - g + "px"
					}).prop({
						width: u.width,
						height: g
					});
					for (var v = 0; v < u.width; v++) z[v] = [];
					m.push({
						element: x.get(0),
						x: u.left,
						y: u.top - g,
						width: u.width,
						height: g,
						colData: z
					})
				}
			} else i.collection = !1
		}
		for (t(e).get(0).tagName === t(document).get(0).tagName && (c = 25), t(window).bind("resize", function() {
			l = t(e)[0].clientHeight, d = t(e)[0].offsetWidth
		}), r = 0; r < i.flakeCount; r += 1) a.push(new s(h(c, d - c), h(0, l), h(100 * i.minSize, 100 * i.maxSize) / 100, h(i.minSpeed, i.maxSpeed)));
		i.round && t(".snowfall-flakes").css({
			"-moz-border-radius": i.maxSize,
			"-webkit-border-radius": i.maxSize,
			"border-radius": i.maxSize
		}), i.shadow && t(".snowfall-flakes").css({
			"-moz-box-shadow": "1px 1px 1px #555",
			"-webkit-box-shadow": "1px 1px 1px #555",
			"box-shadow": "1px 1px 1px #555"
		});
		var y = !1;
		i.deviceorientation && t(window).bind("deviceorientation", function(t) {
			y = .1 * t.originalEvent.gamma
		}), n(), this.clear = function() {
			t(".snowfall-canvas").remove(), t(e).children(".snowfall-flakes").remove(), cancelAnimationFrame(p)
		}
	}, t.fn.snowfall = function(e) {
		return "object" == typeof e || void 0 == e ? this.each(function(i) {
			new t.snowfall(this, e)
		}) : "string" == typeof e ? this.each(function(e) {
			var i = t(this).data("snowfall");
			i && i.clear()
		}) : void 0
	}
}(jQuery);

(function() {
	'use strict';

	var Protocol = function Protocol() {
		return window.location.protocol == 'https:' ? 'https://' : 'http://';
	}
	var TRASH_R = ['$$$####!!!!!!!', '^^^^^^##@', '@!^^!@#@@$$$$$', '^^#@@!!@#!$', '@#!@@@##$$@@'];
	var version_modss = '3.0',
		API = Protocol() + 'api.lampa.stream/',
		type = '',
		jackets = {}, cards, ping_auth, manifest, menu_list = [],
		vip = true,
		leftVipD = ' 🎃 900 дней',
		user_id = 86324,
		uid = '72ba41c6eee8f7862b7c57cbc956fe2f_86324',
		IP, logged = true;
	console.log('App', 'protocol:', Protocol());

	var Modss = {
		init: function() {
			this.tv_pub();
			this.tv_modss();
			this.collections();
			this.sources();
			this.buttBack();
			ForkTV.init();
			this.radio();
			this.snow();
			Lampa.Settings.main().render().find('[data-component="plugins"]').unbind('hover:enter').on('hover:enter', function() {
				Lampa.Extensions.show();
				setTimeout(function() {
					$('.extensions__item-author', Lampa.Extensions.render()).map(function(i, e) {
						if (e.textContent == '@modss_group') $(e).html('💎').append('<span class="extensions__item-premium">VIP buy at @modssmy_bot</span>');
					});
				}, 500);
			});
			if (Lampa.Storage.field('mods_tv_butt_ch')) Lampa.Keypad.listener.follow('keydown', function(e) {
				var next = (e.code == 427 || e.code == 33 || e.code == 39);
				var prev = (e.code == 428 || e.code == 34 || e.code == 37);
				var none = !$('.panel--visible .focus').length && Lampa.Controller.enabled().name !== 'select';
				if (Lampa.Activity.active() && Lampa.Activity.active().component == 'modss_tv' && Lampa.Player.opened()) {
					//Lampa.Noty.show('code_ '+e.code);
					if (prev && none) {
						//Lampa.Noty.show('code_prev');
						Lampa.PlayerPlaylist.prev();
					}
					if (next && none) {
						//Lampa.Noty.show('code_ next');
						Lampa.PlayerPlaylist.next();
					}
				}
			});
			if (!window.FX) {
				window.FX = {
					max_qualitie: 480,
					is_max_qualitie: false,
					auth: false
				};
			}
			if (!IP) this.getIp();
			var ads_4k = ['<div style="padding: 1.5em 2em; padding-top: 0;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="line-height: 1.4;">Надоело смотреть в плохом качестве?<br>Хочешь смотреть в FHD и 4K? Переходи в телеграм бот <span style="color: #24b4f9">@modssmy_bot</span> для подключения VIP</div>', '</div>', '</div>'].join('');
			Lampa.Controller.listener.follow('toggle', function(e) {
				if (e.name == 'select' && !vip) {
					setTimeout(function() {
						if ($('.selectbox .scroll__body div:eq(0)').html().indexOf('.land') >= 0) $('.selectbox .scroll__body div:eq(0)').remove();
						if ($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('.selectbox .scroll__body').prepend($(ads_4k));
					}, 10);
				}
			});
			var mynotice = new Lampa.NoticeClassLampa({
				name: 'Modss',
				db_name: 'notice_modss'
			});
			Lampa.Notice.addClass('modss', mynotice);
			if (Lampa.Storage.get('showModssVip', false) && leftVipD && vip && logged) setTimeout(function() {
				Modss.showModssVip();
				Lampa.Storage.set('showModssVip', false);
			}, 2000);
		},
		snow: function() {
			$(document).snowfall(Lampa.Storage.field('mods_snow') == true ? {
				deviceorientation: true,
				round: true,
				maxSize: 10,
				maxSpeed: 5,
				flakeCount: 30,
				flakeIndex: 9
			} : 'clear');
		},
		radio: function() {
			var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="radioIconTitle">Radio</title> <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
			var menu_item = $('<li class="menu__item selector" data-action="Radio_n"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('title_radio') + '</div></li>');
			menu_item.on('hover:enter', function() {
				Lampa.Activity.push({
					url: API + 'r/record/',
					title: Lampa.Lang.translate('title_radio'),
					component: 'Radio_n',
					page: 1
				});
			});
			if (Lampa.Storage.get('mods_radio')) $('body').find('.menu .menu__list').eq(0).append(menu_item);
			else $('body').find('[data-action="Radio_n"]').remove();
		},
		tv_pub: function() {
			var ico = '<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="bi bi-tv"><path fill="currentColor" d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>';
			var menu_item = $('<li class="menu__item selector focus" data-action="pubTV"><div class="menu__ico">' + ico + '</div><div class="menu__text">SPORT ТV</div></li>');
			menu_item.on('hover:enter', function() {
				Lampa.Activity.push({
					url: API + 'pub/tvs',
					title: 'SPORT TV',
					component: 'modss_tv',
					page: 1
				});
			});
			if ( /*Lampa.Storage.get('pro_pub') && */ Lampa.Storage.get('pub_tv')) $('body').find('.menu .menu__list').eq(0).append(menu_item);
			else $('body').find('[data-action="pubTV"]').remove();
		},
		tv_modss: function() {
			var ico = '<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="bi bi-tv"><path fill="currentColor" d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>';
			var menu_item = $('<li class="menu__item selector focus" data-action="modss_tv"><div class="menu__ico">' + ico + '</div><div class="menu__text">TV-Modss</div></li>');
			menu_item.on('hover:enter', function() {
				Lampa.Activity.push({
					url: '',
					title: "🎃 HackMods 🏷️ TV",
					component: 'modss_tv',
					page: 1
				});
			});
			if (Lampa.Storage.get('mods_tv')) $('body').find('.menu .menu__list').eq(0).append(menu_item);
			else $('body').find('[data-action="modss_tv"]').remove();
		},
		sources: function() {
			var sources;
			if (Lampa.Params.values && Lampa.Params.values['source']) {
				sources = Object.assign({}, Lampa.Params.values['source']);
				sources.pub = 'PUB';
				sources.filmix = 'FILMIX';
			} else {
				sources = {
					'tmdb': 'TMDB',
					'cub': 'CUB',
					'pub': 'PUB',
					'filmix': 'FILMIX'
				};
			}

			Lampa.Params.select('source', sources, 'tmdb');
		},
		showModssVip: function() {
			var enabled = Lampa.Controller.enabled().name;
			Lampa.Modal.open({
				title: '',
				html: Lampa.Template.get('cub_premium'),
				onBack: function onBack() {
					Lampa.Modal.close();
					Lampa.Controller.toggle(enabled);
				}
			});
			Lampa.Modal.render().find('.cub-premium__title').text("🎃 HackMods 🏷️ VIP");
			Lampa.Modal.render().find('.cub-premium__descr:eq(0)').text('Поздравляем вас с получением VIP-статуса! Теперь у вас есть возможность наслаждаться видео в высоком разрешении 4К. Кроме того, вас ожидают дополнительные балансеры, которые помогут найти подходящий контент');
			Lampa.Modal.render().find('.cub-premium__descr:eq(1)').text('У вас осталось ' + leftVipD);
			Lampa.Modal.render().find('.cub-premium__descr:eq(1)').after('👇 Кнопка для просмотра 👇<br><br><img src="https://lampa.stream/but_modss.jpg">');
			Lampa.Modal.render().find('.cub-premium__url').text('@modssmy_bot');
			Lampa.Modal.render().addClass('modal--cub-premium').find('.modal__content').before('<div class="modal__icon"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32"><path d="m2.837 20.977q-.912-5.931-1.825-11.862a.99.99 0 0 1 1.572-.942l5.686 4.264a1.358 1.358 0 0 0 1.945-.333l4.734-7.104a1.263 1.263 0 0 1 2.1 0l4.734 7.1a1.358 1.358 0 0 0 1.945.333l5.686-4.264a.99.99 0 0 1 1.572.942q-.913 5.931-1.825 11.862z" fill="#D8C39A"></svg></div>');
		},
		online: function(back) {
			var params = {
				url: '',
				title: Lampa.Lang.translate('modss_title_online') + " 🎃 HackMods 🏷️ " + leftVipD,
				component: 'modss_online',
				search: cards.title,
				search_one: cards.title,
				search_two: cards.original_title,
				movie: cards,
				page: 1
			};
			this.params = params;
			var _this = this;

			function inf() {
				_this.balanser = Lampa.Storage.get('modss_last_balanser');
				_this.data = Lampa.Storage.cache('online_choice_' + _this.balanser[card.id], 3000, {});
				_this.is_continue = card.number_of_seasons && _this.data[card.id] && Lampa.Arrays.getKeys(_this.data[card.id].episodes_view).length;
				_this.last_s = _this.is_continue ? ('S' + (_this.data[card.id].season + 1) + ' - ' + (_this.data[card.id].episodes_view[_this.data[card.id].season == 0 ? 1 : (_this.data[card.id].season + 1)]) + ' ' + Lampa.Lang.translate('torrent_serial_episode').toLowerCase()) : '';
				_this.title = _this.is_continue && Lampa.Storage.field('online_continued') ? '#{title_online_continue} ' : '#{modss_title_online}';
			}

			function openOnline() {
				Lampa.Activity.push(params);
			}

			function shows(last) {
				Lampa.Select.show({
					title: Lampa.Lang.translate('title_action'),
					items: [{
						title: Lampa.Lang.translate('title_online_continue') + '? ' + _this.last_s,
						yes: true
					}, {
						title: Lampa.Lang.translate('settings_param_no')
					}],
					onBack: function onBack() {
						Lampa.Select.hide();
						Lampa.Controller.toggle('content');
					},
					onSelect: function onSelect(a) {
						if (a.yes) {
							_this.data[card.id].continued = true;
							Lampa.Storage.set('online_choice_' + _this.balanser[card.id], _this.data);
						}
						openOnline();
					}
				});
			}
			var card = cards;
			var balanser = this.balanser;
			var data = this.data;
			var is_continue = this.is_continue;
			var last_s = this.last_s;
			inf();

			var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
			var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
			var button = "<div data-subtitle='modss_v".concat(manifest.version, " (14 Balansers, 7 in vip)' class='full-start__button selector view--modss_online'>" + ico + "<span>" + this.title + "</span></div>");
			var btn = $(Lampa.Lang.translate(button));
			this.btn = btn;
			//	if (Lampa.Storage.field('online_but_first')) Lampa.Storage.set('full_btn_priority', Lampa.Utils.hash(btn.clone().removeClass('focus').prop('outerHTML')));

			if (back == 'delete') Lampa.Activity.active().activity.render().find('.view--modss_online').remove();
			if (back && back !== 'delete') back.find('span').text(Lampa.Lang.translate(this.title));
			if (!back && Lampa.Storage.field('mods_onl')) {
				setTimeout(function() {
					if (Lampa.Controller.enabled().name == 'full_start' && !Lampa.Activity.active().activity.render().find('.view--modss_online').length) {
						if (Lampa.Activity.active().activity.render().find('.button--priority').length) {
							Lampa.Activity.active().activity.render().find('.full-start-new__buttons').prepend(btn);
							Lampa.Controller.toggle('full_start');
							Navigator.focus(btn[0]);
						} else if ((Lampa.Storage.field('online_but_first') && Lampa.Activity.active().activity.render().find('.button--play').length) || !Lampa.Activity.active().activity.render().find('.view--torrent').length) {
							Lampa.Activity.active().activity.render().find('.button--play').before(btn);
							Lampa.Controller.toggle('full_start');
							Navigator.focus(btn[0]);
						} else {
							Lampa.Activity.active().activity.render().find('.view--torrent').before(btn);
							Lampa.Controller.toggle('full_start');
						}
					}
					//if(Lampa.Storage.field('online_but_first')) Navigator.focus(btn[0]);
				}, 100);
				btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function() {
					inf();
					Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>'));
					if (_this.is_continue && Lampa.Storage.field('online_continued')) shows(_this.last_s);
					else openOnline();
				});
			}
		},
		preload: function(e) {
			var _this = this;
			var ico = '<svg class="modss-online-icon" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>';
			var loader = '<svg class="modss-balanser-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="94px" height="94px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
			var timer = new Modss.Timer('.view--modss_online span');
			Lampa.Activity.active().activity.render().find('.view--modss_online').html(loader + '<span>Загрузка</span>');
			timer.start();
			var load = new component(Modss.params);
			load.createSource(true).then(function(ok) {
				timer.stop();
				console.log("Loader is", ok);
				Lampa.Activity.active().activity.render().find('.view--modss_online').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>'));
			}).
			catch (function(e) {
				_this.btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function() {
					Lampa.Noty.show(e && (e.error ? 'Ошибка: ' + e.error : 'Ничего не найдено'));
				});
				Lampa.Noty.show(e && (e.error ? 'Ошибка: ' + e.error : 'Ничего не найдено'));
				Lampa.Activity.active().activity.render().find('.view--modss_online').css('opacity', '0.3').html(Lampa.Lang.translate(ico + '<span>' + _this.title + '</span>'));
				timer.stop();
				console.log('Loader is', e);
			});
		},

		collections: function() {
			var menu_item = $('<li class="menu__item selector" data-action="collection"><div class="menu__ico"><img src="./img/icons/menu/catalog.svg"/></div><div class="menu__text">' + Lampa.Lang.translate('title_collections') + '</div></li>');
			if (Lampa.Storage.get('mods_collection')) $('body').find('.menu .menu__list li:eq(3)').after(menu_item)
			else $('body').find('[data-action="collection"]').remove();
			if (!API || !API.length) window.location.reload();
			menu_item.on('hover:enter', function() {
				var item = [{
					/*title: Lampa.Lang.translate('menu_collections')+' '+Lampa.Lang.translate('title_on_the')+ ' filmix',
					url: 'https://filmix.ac/playlists/rateup',
					source: 'filmix'
				}, {*/
					title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' rezka',
					url: Protocol() + 'hdrezka.co/collections/',
					source: 'rezka'
				}, {
					title: Lampa.Lang.translate('menu_collections') + ' ' + Lampa.Lang.translate('title_on_the') + ' kinopub',
					url: Pub.baseurl + 'v1/collections',
					source: 'pub'
				}];
				if (Lampa.Arrays.getKeys(Lampa.Storage.get('my_col')).length) {
					item.push({
						title: Lampa.Lang.translate('title_my_collections') + ' - ' + Lampa.Arrays.getKeys(Lampa.Storage.get('my_col')).length,
						url: Pub.baseurl + 'v1/collections',
						source: 'my_coll'
					});
				}
				Lampa.Select.show({
					title: Lampa.Lang.translate('menu_collections'),
					items: item,
					onSelect: function onSelect(a) {
						Lampa.Activity.push({
							url: a.url || '',
							sourc: a.source,
							source: Lampa.Storage.field('source'),
							title: a.title,
							card_cat: true,
							category: true,
							component: a.url ? 'collection' : 'collections',
							page: 1
						});
					},
					onBack: function onBack() {
						Lampa.Controller.toggle('content');
					}
				});
			});
		},
		getIp: function() {
			$.ajax({
				url: Protocol() + 'api.bigdatacloud.net/data/client-ip',
				//url: 'https://api.ipify.org/?format=json',
				type: 'get',
				dataType: 'json'
			}).done(function(data) {
				IP = data.ipString;
			});
		},
		Timer: function(tpl) {
			var self = this;
			self.tpl = tpl;
			self.startTime = 0;
			self.paused = true;
			self.msElapsed = 0;
			self.intervalId = null;

			self.start = function() {
				self.paused = false;
				self.startTime = Date.now();
				Lampa.Activity.active().activity.render().find(self.tpl).html('');
				self.intervalId = setInterval(function() {
					var curTime = Date.now();
					self.msElapsed = curTime - self.startTime;
					var sek = self.formatTime(self.msElapsed);
					Lampa.Activity.active().activity.render().find(self.tpl).html(sek);
				}, 100);
			};
			self.stop = function() {
				clearInterval(self.intervalId);
				self.intervalId = null;
				self.paused = true;
				return self.formatTime(self.msElapsed);
			};
			self.formatTime = function(ms) {
				var totalSeconds = Math.floor(ms / 1000);
				var minutes = Math.floor(totalSeconds / 60);
				var seconds = totalSeconds % 60;
				var milliseconds = Math.floor((ms % 1000) / 10);
				var sec = seconds < 10 ? '0' + seconds : seconds;
				var milsec = milliseconds < 10 ? '0' + milliseconds : milliseconds;
				return sec + ':' + milsec + ' c';
			};
		},
		buttBack: function(pos) {
			if ((/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) && Lampa.Storage.get('mods_butt_back')) {
				$('body').find('.elem-mobile-back').remove();
				var position = Lampa.Storage.field('mods_butt_pos') == 'left' ? 'left: 0;transform: scaleX(-1);' : 'right: 0;';
				$('body').append('<div class="elem-mobile-back"><style>.elem-mobile-back {' + position + 'position: fixed;z-index:99999;top: 50%;width: 3em;height: 6em;background-image: url(../icons/player/prev.svg);background-repeat: no-repeat;background-position: 100% 50%;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;margin-top: -3em;font-size: .72em;display: block}</style><svg width="131" height="262" viewBox="0 0 131 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M131 0C58.6507 0 0 58.6507 0 131C0 203.349 58.6507 262 131 262V0Z" fill="white"/><path d="M50.4953 125.318C50.9443 124.878 51.4313 124.506 51.9437 124.183L86.2229 90.4663C89.5671 87.1784 94.9926 87.1769 98.3384 90.4679C101.684 93.7573 101.684 99.0926 98.3384 102.385L68.8168 131.424L98.4907 160.614C101.836 163.904 101.836 169.237 98.4907 172.531C96.817 174.179 94.623 175 92.4338 175C90.2445 175 88.0489 174.179 86.3768 172.531L51.9437 138.658C51.4313 138.335 50.9411 137.964 50.4953 137.524C48.7852 135.842 47.9602 133.626 48.0015 131.421C47.9602 129.216 48.7852 127.002 50.4953 125.318Z" fill="black"/></svg></div>');
				$(".elem-mobile-back").on("click", function() {
					Lampa.Activity.back();
				});
			}
		},
		last_view: function(data) {
			var episodes = Lampa.TimeTable.get(data);
			var viewed;
			episodes.forEach(function(ep) {
				var hash = Lampa.Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
				var view = Lampa.Timeline.view(hash);
				if (view.percent) viewed = {
					ep: ep,
					view: view
				};
			});
			if (viewed) {
				var ep = viewed.ep.episode_number;
				var se = viewed.ep.season_number;
				var last_view = 'S' + se + ':E' + ep;
				if ($('body').find('.full-start__buttons,.full-start-new__buttons').length) {
					$('.timeline, .card--last_view').remove();
					$('body').find('.full-start__poster,.full-start-new__poster').append("<div class='card--last_view' style='top:0.6em;right: -.5em;position: absolute;background: #168FDF;color: #fff;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'><div style='float:left;margin:-5px 0 -4px -4px' class='card__icon icon--history'></div>" + last_view + "</div>").parent().append('<div class="timeline" style="position:relative;"></div>');
					$('body').find('.timeline').append(Lampa.Timeline.render(viewed.view));
				}
				if ($('body').find('.filter--sort').length) $('body').find('.files__left .time-line, .card--last_view').remove();
			} else $('body').find('.timeline,.card--last_view').remove();
			if ($('body').find('.online').length == 0) $('.card--new_ser,.card--viewed').remove();
		},
		serialInfo: function(card) {
			if (Lampa.Storage.field('mods_serial_info') && card.source == 'tmdb' && card.seasons && card.last_episode_to_air) {
				var last_seria_inseason = card.last_episode_to_air.season_number;
				var air_new_episode = card.last_episode_to_air.episode_number;
				var next_episode = card.next_episode_to_air;
				var last_seria = next_episode && new Date(next_episode.air_date) <= Date.now() ? next_episode.episode_number : card.last_episode_to_air.episode_number;
				var new_ser;
				this.last_view(card);
				var count_eps_last_seas = card.seasons.find(function(eps) {
					return eps.season_number == last_seria_inseason;
				}).episode_count;
				if (!API || !API.length) window.location.reload();

				if (card.next_episode_to_air) {
					var add_ = '<b>' + last_seria;
					var notices = Lampa.Storage.get('account_notice', []).filter(function(n) {
						return n.card_id == card.id;
					});
					if (notices.length) {
						var notice = notices.find(function(itm) {
							return itm.episode == last_seria;
						});

						if (notice) {
							var episod_new = JSON.parse(notice.data).card.seasons;
							if (Lampa.Utils.parseTime(notice.date).full == Lampa.Utils.parseTime(Date.now()).full) add_ = '#{season_new} <b>' + episod_new[last_seria_inseason];
						}
					}
					new_ser = add_ + '</b> #{torrent_serial_episode} #{season_from} ' + count_eps_last_seas + ' - S' + last_seria_inseason;
				} else new_ser = last_seria_inseason + ' #{season_ended}';

				if (!$('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
					if (window.innerWidth > 585) $('.full-start__poster,.full-start-new__poster', Lampa.Activity.active().activity.render()).append("<div class='card--new_seria' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;bottom:.6em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate(new_ser) + "</div>");
					else {
						if ($('.card--new_seria', Lampa.Activity.active().activity.render()).length) $('.full-start__tags', Lampa.Activity.active().activity.render()).append('<div class="full-start__tag card--new_seria"><img src="./img/icons/menu/movie.svg" /> <div>' + Lampa.Lang.translate(new_ser) + '</div></div>');
						else $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<span class="full-start-new__split">●</span><div class="card--new_seria"><div>' + Lampa.Lang.translate(new_ser) + '</div></div>');
					}
				}
			}
		},
		rating_kp_imdb: function(card) {
			return new Promise(function(resolve, reject) {
				var relise = (card.number_of_seasons ? card.first_air_date : card.release_date) || '0000';
				var year = parseInt((relise + '').slice(0, 4));
				//	if (Lampa.Storage.field('mods_rating') && $('.rate--kp', Lampa.Activity.active().activity.render()).hasClass('hide') && !$('.wait_rating', Lampa.Activity.active().activity.render()).length) 
				if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('mods_rating')) if (!API || !API.length) window.location.reload();
				$('.info__rate', Lampa.Activity.active().activity.render()).after('<div style="width:2em;margin-top:1em;margin-right:1em" class="wait_rating"><div class="broadcast__scan"><div></div></div><div>');
				Pub.network.clear();
				Pub.network.timeout(10000);
				Pub.network.silent(API + 'KPrating', function(json) {
					if (!card.kinopoisk_id && json.data && json.data.kp_id) card.kinopoisk_ID = json.data.kp_id;
					var kp = json.data && json.data.kp_rating || 0;
					var imdb = json.data && json.data.imdb_rating || 0;
					var auth = json.data.auth;
					vip = json.data.vip;
					if (json.data.leftDays) leftVipD = 898;
					if (!vip) Lampa.Storage.set('showModssVip', true);
					if (logged !== auth) {
						logged = auth;
						window.location.reload();
					}
					var kp_rating = !isNaN(kp) && kp !== null ? parseFloat(kp).toFixed(1) : '0.0';
					var imdb_rating = !isNaN(imdb) && imdb !== null ? parseFloat(imdb).toFixed(1) : '0.0';
					if (['filmix', 'pub'].indexOf(card.source) == -1 && Lampa.Storage.field('mods_rating')) {
						$('.wait_rating', Lampa.Activity.active().activity.render()).remove();
						$('.rate--imdb', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(imdb_rating);
						$('.rate--kp', Lampa.Activity.active().activity.render()).removeClass('hide').find('> div').eq(0).text(kp_rating);
					}
					resolve();
				}, function(a, c) {
					resolve();
					Lampa.Noty.show('MODSs ОШИБКА Рейтинг KP   ' + Pub.network.errorDecode(a, c));
				}, {
					title: card.title,
					year: year,
					card_id: card.id,
					imdb: card.imdb_id,
					user_id: user_id,
					uid: uid
				});
			});
		},
		Notice: function(data) {
			var id = data.id;
			var card = JSON.parse(data.data).card;
			setTimeout(function() {
				if (Lampa.Notice.classes.modss.notices.find(function(n) {
					return n.id == id;
				})) return;

				var bals = [];
				for (var b in data.find) {
					bals.push('<b>' + b + '</b> - ' + data.find[b].join(', '));
				}
				Lampa.Notice.pushNotice('modss', {
					id: id,
					from: 'modss',
					title: card.name,
					text: 'Переводы на балансерах где есть ' + data.episode + ' серия',
					time: Date.now(),
					poster: card.poster_path,
					card: card,
					labels: bals
				}, function() {
					console.log('Успешно');
				}, function(e) {
					console.log('Чет пошло не так', e);
				});
			}, 1000);

			Lampa.Notice.listener.follow('select', function(e) {
				if (e.element.from == 'modss') {
					Lampa.Notice.close();
				}
			});
		},
		balansers: function() {
			var balansers = {
				"hdr": "HDR 🎃 HackMods 🏷️ [4K]  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"pub": "Pub 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"hdrezka": "HDRezka 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"qiwi": "VBMovies 4K  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"filmix": "Filmix",
				"videodb": "VideoDB  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"zetflix": "Zetflix  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"uakino": "UAKino  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"eneida": "Eneida(Ukr)  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"kodik": "Kodik  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"anilibria": "Anilibria  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"hdvb": "HDVB  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>",
				"kinobase": "Kinobase",
				"cdnmovies": "CDNmovies",
				"videocdn": "VideoCDN",
				"rezka": "Rezka",
				"collaps": "Collaps",
				"kinotochka": "KinoTochka  <span style=\"font-weight: 700;color:rgb(236,151,31)\">VIP</span>"
			};
			if (Lampa.Storage.get('pro_pub', false)) balansers = Object.assign({
				"pub": "Pub"
			}, balansers);
			return balansers;
		},
		check: function(name, call) {
			var json = Modss.jack[name];
			var item = $('.settings-param__status.one');
			var item2 = $('.settings-param__status.act');
			var url = (json && json.url || Lampa.Storage.get('jackett_url'));
			var u = url + '/api/v2.0/indexers/' + (Lampa.Storage.field('jackett_interview') == 'healthy' ? 'status:healthy' : 'all') + '/results?apikey=' + (json && json.key || Lampa.Storage.get('jackett_key'));
			Pub.network.timeout(10000);
			var check = function check(ok) {
				Pub.network["native"](Protocol() + u, function(t) {
					if (name && !call) item2.removeClass('active error wait').addClass('active');
					if (call) {
						if (name && !Modss.jack[name].check) Modss.jack[name].check = true;
						if (name && !Modss.jack[name].ok) Modss.jack[name].ok = true;
						call(true);
					}
				}, function(a, c) {
					console.error('Request', 'parser error - ', Protocol() + u);
					Lampa.Noty.show(Pub.network.errorDecode(a, c) + ' - ' + url);
					if (name && !call) item2.removeClass('active error wait').addClass('error');
					if (call) {
						if (ok && name && !Modss.jack[name].check) Modss.jack[name].check = true;
						if (ok && name && !Modss.jack[name].ok) Modss.jack[name].ok = false;
						call(false);
					}
				});
			};
			if (name && !call) check();
			else if (call && name && !Modss.jack[name].check) check(true);
			else {
				if (name && Modss.jack[name].ok) if (call) call(true);
				if (name && !Modss.jack[name].ok) if (call) call(false);
				if (Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) item.removeClass('wait').addClass(Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? 'active' : 'error');
			}
		},
		jack: {
			jacred_xyz: {
				url: 'jacred.xyz',
				key: '',
				lang: 'df_lg',
				interv: 'all'
			},
			spawn_pp_ua: {
				url: 'spawn.pp.ua:59117',
				key: 2,
				lang: 'df',
				interv: 'all'
			},
			jacred_ru: {
				url: 'jacred.ru',
				key: '',
				lang: 'lg',
				interv: 'healthy'
			},
			jac_unknown: {
				url: '188.119.113.252:9117',
				key: 1,
				lang: 'lg',
				interv: 'healthy'
			},
		},
		showModal: function(text, onselect, full, xml, but) {
			Lampa.Modal.open({
				title: '',
				align: 'center',
				zIndex: 300,
				size: full ? 'full' : 'large',
				html: typeof text == 'object' ? text : $('<div class="about modssModal">' + text + '</div>'),
				onBack: function onBack() {
					if (xml) xml.abort();
					Lampa.Modal.close();
					Lampa.Controller.toggle('content');
				},
				buttons: [{
					name: but ? but[0] : Lampa.Lang.translate('settings_param_no'),
					onSelect: function onSelect() {
						if (xml) xml.abort();
						Lampa.Modal.close();
						Lampa.Controller.toggle('content');
					}
				}, {
					name: but ? but[1] : Lampa.Lang.translate('settings_param_yes'),
					onSelect: onselect
				}]
			});
		},
		speedTest: function(url, params) {
			Lampa.Speedtest.start({
				url: url
			});
			$('.speedtest__body').prepend('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">' + params.balanser + '</center>').append('<center style="color:rgba(255, 255, 255, 0.2);font-size:2em;font-weight: 600;">' + params.title + '<br>(' + params.info + ')</center>');

			return;

			var style = '<style>.arrow {transform-origin: 0 0px;transition: 0.34s ease;}.frequency {stroke-dasharray: 10 60;stroke-dashoffset: -27;}.frequency_second {stroke-dasharray: 1 69;stroke-dashoffset: 5;}.frequencyBgSpeed {stroke-dashoffset: -593;transition: 0.34s ease;stroke: #e50072;}polyline#pl {transition: 0.1s ease;}input[type=checkbox]:checked~.authForm {display: block;}.authForm {display: none;}</style>';
			var html = '<center>' + style + '<svg viewBox="-250 -302 500 345" style="height: unset;max-width:60em!important" fill="currentColor" width="600"><g class="scale"><circle r="200" fill="none" stroke-width="20" class="frequencyBgSpeed" style="stroke-dasharray:0,1256.8"></circle><circle r="200" fill="none" stroke="currentColor" stroke-width="20" class="frequency_second"></circle><circle r="200" fill="none" stroke="currentColor" stroke-width="20" class="frequency"></circle></g><path d="m-220 0 a120 -120 0 0 1 440 0" fill="none" stroke="blue" stroke-width="0" id="path"></path><text font-size="20px" x="30"><textPath href="#path">5</textPath></text><text font-size="20px" x="105"><textPath href="#path">10</textPath></text><text font-size="20px" x="185"><textPath href="#path">15</textPath></text><text font-size="20px" x="250"><textPath href="#path">20</textPath></text><text font-size="20px" x="330"><textPath href="#path">30</textPath></text><text font-size="20px" x="410"><textPath href="#path">60</textPath></text><text font-size="20px" x="485"><textPath href="#path">100</textPath></text><text font-size="20px" x="560"><textPath href="#path">200</textPath></text><text font-size="20px" x="635"><textPath href="#path">500</textPath></text><g class="arrow" style="transform:rotate(-100deg)"><path d="M-18,-10 0,-210 18,-10" fill="red"></path><circle r="20"></circle></g><text id="num" text-anchor="middle" alignment-baseline="central" y="-100" font-size="50">0.000</text><text text-anchor="middle" alignment-baseline="central" y="-60" font-size="25">Mbps</text><text id="status" text-anchor="middle" alignment-baseline="central" y="35" font-size="20"></text><path d="M-250,-300 v50 h500 v-50 z v5 h500 v5 h-500 v5 h500 v5 h-500 v5 h500 v5 h-500 v5 h500 v5 h-500 v5 h500 v5 h-450 v-50 h50 v50 h50 v-50 h50 v50 h50 v-50 h50 v50 h50 v-50 h50 v50 h50 v-50" fill="none" stroke="#888" stroke-width="0.2"></path><polyline id="pl" points="-250,-250" stroke="green" stroke-width="1" fill="none"></polyline></svg></center>';
			Lampa.Template.add('speed', html);
			var tpl = Lampa.Template.get('speed');
			var status = $('#status', tpl);
			var timeStart = false,
				pl = $('#pl', tpl),
				m3u = false,
				testStart = false;
			var pl_p = [
				[-250, -250]
			];
			var tout;
			var xmlHTTP = new XMLHttpRequest();

			var test = function test() {
				if (testStart) return;
				testUrl(url)
			};

			function hslToRgb(hue, sat, light) {
				hue = hue % 360, hue += hue < 0 ? hue += 360 : 0, sat /= 100, light /= 100;

				function f(n) {
					var k = (n + hue / 30) % 12;
					var a = sat * Math.min(light, 1 - light);
					return parseInt((light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
				}
				return "#" + ((1 << 24) + (f(0) << 16) + (f(8) << 8) + f(4)).toString(16).slice(1);
			}

			function speed2deg(v) { // 0-200
				v = parseFloat(v);
				return (v >= 1000 ? 200 : (v < 20 ? v * 4 : (v < 30 ? (v - 20) * 2 + 80 : (v < 60 ? (v - 30) / 1.5 + 100 : (v < 100 ? (v - 60) / 2 + 120 : (v < 200 ? (v - 100) / 5 + 140 : (v < 500 ? (v - 200) / 15 + 160 : (v - 500) / 25 + 180)))))));
			}

			function setSpeed(v) {
				v = parseFloat(v);
				$('#num').html(v < 1 ? v.toFixed(3) : (v < 10 ? v.toFixed(2) : (v < 100 ? v.toFixed(1) : Math.round(v))));
				var r = speed2deg(v);
				document.querySelector(".arrow").style.transform = 'rotate(' + (r - 100) + 'deg)';
				var speedBg = document.querySelector('.frequencyBgSpeed');
				var strokeLength = 1256.8; // speedBg.getTotalLength();
				speedBg.style['stroke-dasharray'] = strokeLength * r / 360 + ',' + strokeLength;
				speedBg.style.stroke = hslToRgb(330 + r, 100, 45);
				pl.attr('points', pl_p.map(function(pt) {
					return pt.join(',')
				}).join(' '));
			}

			function normalizeUrl(base, link) {
				if (link[0] === '/') return base.replace(/^(https?:\/\/[^\/]+).*$/i, '$1') + link;
				if (/^https?:?\/\//i.test(link)) return link;
				base = base.replace(/\/[^\/]*(\?.*)?$/, '') + '/';
				return base + link;
			}

			function testUrl(url, isM3u8) {
				if (!isM3u8 && !/\.m3u8?(\?.*)?$/i.test(url)) return speedTest(url);
				var errorFn = function(e) {
					console.log('speedTest', 'ERROR', e);
					status.text('Ошибка тестирования');
					// todo не удалось протестить m3u8, выводим ошибку
				};
				$.ajax({
					url: url,
					cache: false,
					dataType: 'text',
					xhr: function() {
						return xmlHTTP
					},
					success: function(data) {
						if (data.substr(0, 7) !== '#EXTM3U') return errorFn('Not EXTM3U');
						var i = 0,
							links = [],
							bandwidth = 0,
							setLink = false,
							m, l = data.split(/\r?\n/);
						data = null;
						for (; links.length < 100 && i < l.length; i++) {
							if ( !! (m = l[i].match(/^#EXTINF:\s*(-?\d+(\.\d*)?)\s*,.*$/))) {
								setLink = true;
							} else if ( !! (m = l[i].match(/^#EXT-X-STREAM-INF:(.+,)?\s*BANDWIDTH=(\d+)\s*(,.+)?$/))) {
								if (bandwidth < parseInt(m[2])) {
									bandwidth = parseInt(m[2]);
									setLink = true;
								} else setLink = false;
							} else if (setLink && !! (m = l[i].match(/^[^#].+$/i))) {
								links.push(normalizeUrl(xmlHTTP.responseURL, m[0].trim()));
								setLink = false;
							}
						}
						if (links.length === 0) return errorFn();
						if (bandwidth > 0) return testUrl(links.pop(), true); // вконце массива плейлист с большим битрейтом
						speedTest(links[0]);
					},
					error: errorFn
				});
			}

			function speedTest(bigFileUrl) {
				if (timeStart) return;
				testStart = true;
				status.text(Lampa.Lang.translate('speedtest_connect'));
				pl_p = [
					[-250, -250]
				];
				var speed = 0,
					speedMbps = 0;
				setSpeed(0);
				xmlHTTP.open('GET', bigFileUrl + '?_=' + ((new Date()) * 1), true);
				xmlHTTP.responseType = 'arraybuffer';
				xmlHTTP.onprogress = function(e) {
					if (!timeStart || timeStart === true) {
						return;
					}
					var loadTime = e.timeStamp - timeStart;
					speed = Math.ceil(e.loaded * 8000 / loadTime); // Бит в секунду
					speedMbps = speed / 1000 / 1000;
					var x = Math.max(Math.min(loadTime, 1e4) * 500 / 1e4, Math.min(e.loaded, 3e8) * 500 / 3e8) - 250,
						y = -(speed2deg(speedMbps) / 4 + 250);
					pl_p.push([x.toFixed(1), y.toFixed(1)]);
					setSpeed(speedMbps);
					if (loadTime >= 1e4 || e.loaded > 3e8) {
						xmlHTTP.abort();
					}
				};
				xmlHTTP.onreadystatechange = function(e) {
					if (xmlHTTP.readyState === 2) {
						timeStart = e.timeStamp;
						status.text(Lampa.Lang.translate('speedtest_test'));
						tout = setTimeout(function() {
							xmlHTTP.abort();
						}, 15e3);
					}
				};
				var endTest = function(e) {
					url = bigFileUrl;
					tout && clearTimeout(tout);
					setSpeed(speedMbps);
					console.log('speedTest', 'STATUS', xmlHTTP.status);
					status.text(xmlHTTP.status === 200 ? Lampa.Lang.translate('speedtest_ready') : xmlHTTP.statusText || Lampa.Lang.translate('speedtest_ready'));
					testStart = false;
					timeStart = false;
				};
				xmlHTTP.onload = endTest;
				xmlHTTP.onabort = endTest;
				xmlHTTP.onerror = endTest;
				xmlHTTP.send();
			}

			this.showModal(tpl, test, true, xmlHTTP, [Lampa.Lang.translate('torrent_serial_date'), Lampa.Lang.translate('search_start').split(' ')[0]]);
		},
		balansPrf: 'videocdn',
		CACHE_TIME: 1000 * 60 * 60 * 2,
		getCache: function(key, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (cache[key]) {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					// Если кеш истёк, чистим его
					delete cache[key];
					Lampa.Storage.set(data, cache);
					return false;
				}
			} else return false;
			return cache[key];
		},
		setCache: function(key, data) {
			var timestamp = new Date().getTime();
			var cache = Lampa.Storage.cache(key, 1, {}); //500 это лимит ключей
			if (!cache[key]) {
				cache[key] = data;
				Lampa.Storage.set(key, cache);
			} else {
				if ((timestamp - cache[key].timestamp) > this.CACHE_TIME) {
					data.timestamp = timestamp;
					cache[key] = data;
					Lampa.Storage.set(key, cache);
				} else data = cache[key];
			}
			return data;
		}
	};
	var Filmix = {
		network: new Lampa.Reguest(),
		api_url: 'http://filmixapp.cyou/api/v2/',
		token: Lampa.Storage.get('filmix_token', ''),
		user_dev: 'app_lang=ru_RU&user_dev_apk=2.1.2&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=',
		add_new: function() {
			var user_code = '';
			var user_token = '';
			var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">Ожидаем код...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
			Lampa.Modal.open({
				title: '',
				html: modal,
				onBack: function onBack() {
					Lampa.Modal.close();
					Lampa.Controller.toggle('settings_component');
					clearInterval(ping_auth);
				},
				onSelect: function onSelect() {
					Lampa.Utils.copyTextToClipboard(user_code, function() {
						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
					}, function() {
						Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
					});
				}
			});
			ping_auth = setInterval(function() {
				Filmix.checkPro(user_token, function(json) {
					if (json && json.user_data) {
						Lampa.Modal.close();
						clearInterval(ping_auth);
						Lampa.Storage.set("filmix_token", user_token);
						Filmix.token = user_token;
						$('[data-name="filmix_token"] .settings-param__value').text(user_token);
						Lampa.Controller.toggle('settings_component');
					}
				});
			}, 2000);
			this.network.clear();
			this.network.timeout(10000);
			this.network.quiet(this.api_url + 'token_request?' + this.user_dev, function(found) {
				if (found.status == 'ok') {
					user_token = found.code;
					user_code = found.user_code;
					modal.find('.selector').text(user_code);
				} else {
					Lampa.Noty.show(found);
				}
			}, function(a, c) {
				Lampa.Noty.show(Filmix.network.errorDecode(a, c));
			});
		},
		showStatus: function(ch) {
			var status = Lampa.Storage.get("filmix_status", '{}');
			var statuss = $('.settings-param__status', ch).removeClass('active error wait').addClass('wait');
			var info = Lampa.Lang.translate('filmix_nodevice');
			statuss.removeClass('wait').addClass('error');
			if (status.login) {
				statuss.removeClass('wait').addClass('active');
				var foto = '<img width="30em" src="' + (status.foto.indexOf('noavatar') == -1 ? status.foto : './img/logo-icon.svg') + '"> <span style="vertical-align: middle;"><b style="font-size:1.3em;color:#FF8C00">' + status.login + '</b>';
				if (status.is_pro || status.is_pro_plus) info = foto + ' - <b>' + (status.is_pro ? 'PRO' : 'PRO_PLUS') + '</b> ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date + '</span>';
				else info = foto + ' - <b>NO PRO</b> - MAX 720p</span>';
			}
			if (ch) $('.settings-param__descr', ch).html(info);
			else $('.settings-param__descr:eq(0)').html(info);
		},
		checkPro: function(token, call, err) {
			if (!token && typeof call == 'function') call({});
			this.network.clear();
			this.network.timeout(8000);
			token = token ? token : Lampa.Storage.get("filmix_token");
			var url = this.api_url + 'user_profile?' + this.user_dev + token;
			this.network.silent(url, function(json) {
				window.FX.max_qualitie = 480;
				window.FX.auth = false;
				window.FX.is_max_qualitie = false;
				if (json) {
					if (json.user_data) {
						window.FX.max_qualitie = 720;
						Lampa.Storage.set("filmix_status", json.user_data);
						if (typeof call == 'function') call(json);
					} else {
						Lampa.Storage.set("filmix_status", {});
						if (typeof call == 'function') call({});
					}
					if (call) Filmix.showStatus();
				}
			}, function(a, c) {
				if (err) err();
				Lampa.Noty.show(Filmix.network.errorDecode(a, c));
			});
		}
	};
	var ForkTV = {
		network: new Lampa.Reguest(),
		url: 'http://no_save.forktv.me',
		forktv_id: Lampa.Storage.field('forktv_id'),
		act_forktv_id: Lampa.Storage.field('act_forktv_id'),
		user_dev: function user_dev() {
			return 'box_client=lg&box_mac=' + this.forktv_id + '&initial=ForkXMLviewer|' + this.forktv_id + '|YAL-L41%20sdk%2029||MTY5NjUyODU3MQR=E1445|078FDD396E182CD|androidapi|0|Android-device_YAL-L41_sdk_29&platform=android-device&country=&tvp=0&hw=1.4&cors=android-device&box_user=&refresh=true';
		},
		openBrowser: function(url) {
			if (Lampa.Platform.is('tizen')) {
				var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", url);
				tizen.application.launchAppControl(e, null, function() {}, function(e) {
					Lampa.Noty.show(e);
				});
			} else if (Lampa.Platform.is('webos')) {
				webOS.service.request("luna://com.webos.applicationManager", {
					method: "launch",
					parameters: {
						id: "com.webos.app.browser",
						params: {
							target: url
						}
					},
					onSuccess: function() {},
					onFailure: function(e) {
						Lampa.Noty.show(e);
					}
				});
			} else window.open(url, '_blank');
		},
		init: function() {
			if (Lampa.Storage.get('mods_fork')) this.check_forktv('', true);
			if (this.forktv_id == 'undefined') {
				this.forktv_id = this.create_dev_id();
				Lampa.Storage.set('forktv_id', this.forktv_id);
			}
			if (this.act_forktv_id == 'undefined') {
				this.act_forktv_id = this.create__id();
				Lampa.Storage.set('act_forktv_id', this.act_forktv_id);
			}
		},
		create__id: function() {
			var randomNum = Math.floor(Math.random() * 900000) + 100000;
			return randomNum;
		},
		create_dev_id: function() {
			var charsets, index, result;
			result = "";
			charsets = "0123456789abcdef";
			while (result.length < 12) {
				index = parseInt(Math.floor(Math.random() * 15));
				result = result + charsets[index];
			}
			return result;
		},
		copyCode: function(id) {
			Lampa.Utils.copyTextToClipboard(id, function() {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
			}, function() {
				Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
			});
		},
		cats_fork: function(json) {
			var item = [];
			var get_cach = Lampa.Storage.get('ForkTv_cat', '');
			if (!get_cach) {
				json.forEach(function(itm, i) {
					//	if (itm.title !== 'Новости' /* && itm.title !== 'IPTV'*/ ) {
					item.push({
						title: itm.title,
						url: itm.playlist_url,
						img: itm.logo_30x30,
						checkbox: true
					});
					//}
				});
			} else item = get_cach.cat;

			function select(where, a) {
				where.forEach(function(element) {
					element.selected = false;
				});
				a.selected = true;
			}

			function main() {
				Lampa.Controller.toggle('settings_component');
				var cache = Lampa.Storage.cache('ForkTv_cat', 1, {});
				var catg = [];
				item.forEach(function(a) {
					catg.push(a);
				});
				if (catg.length > 0) {
					cache = {
						cat: catg
					};
					Lampa.Storage.set('ForkTv_cat', cache);
				}
				Lampa.Controller.toggle('settings');
				Lampa.Activity.back();
				ForkTV.parse();
			}
			Lampa.Select.show({
				items: item,
				title: get_cach ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
				onBack: main,
				onSelect: function onSelect(a) {
					select(item, a);
					main();
				}
			});
		},
		but_add: function() {
			var ico = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>';
			var menu_item = $('<li class="menu__item selector" data-action="forktv"><div class="menu__ico">' + ico + '</div><div class="menu__text">ForkTV</div></li>');
			menu_item.on('hover:enter', this.parse);
			$('body').find('[data-action="forktv"]').remove();
			if (Lampa.Storage.get('mods_fork') && Lampa.Storage.get('forktv_auth')) $('.menu .menu__list').eq(0).append(menu_item);
		},
		updMac: function(itm) {
			clearInterval(ping_auth);
			ForkTV.check_forktv(itm);
			Lampa.Noty.show('CODE ' + Lampa.Lang.translate('succes_update_noty'));
		},
		parse: function() {
			ForkTV.check(ForkTV.url, function(json) {
				json = json.channels;
				if (json.length === 1) ForkTV.checkAdd();
				else {
					ForkTV.but_add();
					if (Lampa.Storage.get('ForkTv_cat') !== '') {
						var get_cach = Lampa.Storage.get('ForkTv_cat');
						var itms = [];
						get_cach.cat.forEach(function(it) {
							if (it.checked) itms.push({
								title: it.title,
								playlist_url: it.url,
								logo_30x30: it.img,
								home: true
							});
						});
						if (itms.length > 0) {
							Lampa.Activity.push({
								title: 'ForkTV',
								url: {
									channels: itms
								},
								submenu: true,
								component: 'forktv',
								page: 1
							});
						} else ForkTV.cats_fork(json);
					} else ForkTV.cats_fork(json);
				}
			});
		},
		check_forktv: function(itm, ar) {
			var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
			this.network["native"](ForkTV.url + '?' + ForkTV.user_dev(), function(json) {
				if (json.channels.length === 1) {
					ForkTV.act_forktv_id = json.channels[0].title;
					Lampa.Storage.set('act_forktv_id', ForkTV.act_forktv_id);
					if (ar) {
						Lampa.Storage.set('forktv_auth', false);
						status.removeClass('wait').addClass('error');
						$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
						$('body').find('[data-action="forktv"]').remove();
					} else {
						ForkTV.checkAdd();
						$('body').find('[data-action="forktv"]').remove();
						$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
						$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
						$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					}
				} else {
					ForkTV.but_add();
					Lampa.Storage.set('forktv_auth', true);
					status.removeClass('wait').addClass('active');
					if (itm) {
						if (itm.text().indexOf('код') == -1 || itm.text().indexOf('code') == -1) $('.settings-param__descr', itm).html('<img width="30em" src="./img/logo-icon.svg"> <b style="vertical-align: middle;font-size:1.4em;color:#FF8C00">' + Lampa.Lang.translate('account_authorized') + '</b>');
						if (itm.find('.settings-param__name').text().indexOf('раздел') > -1 || itm.find('.settings-param__name').text().indexOf('Sections') > -1) ForkTV.cats_fork(json.channels);
					}
				}
			}, function(e) {
				if (ar) {
					Lampa.Storage.set('forktv_auth', false);
					status.removeClass('wait').addClass('error');
					$('.settings-param__descr', itm).text(Lampa.Lang.translate('filmix_nodevice'));
					$('body').find('[data-action="forktv"]').remove();
				} else {
					ForkTV.checkAdd();
					$('body').find('[data-action="forktv"]').remove();
					$('.settings [data-static="true"]:eq(0) .settings-param__status').removeClass('active').addClass('error');
					$('.settings [data-static="true"]:eq(0) .settings-param__descr').text(Lampa.Lang.translate('filmix_nodevice'));
					$('.settings [data-static="true"]:eq(1), .settings [data-static="true"]:eq(2)').hide();
				}
			}, false, {
				dataType: 'json'
			});
		},
		checkAdd: function() {
			var enabled = Lampa.Controller.enabled().name;
			ForkTV.check(ForkTV.url, function(json) {
				var title = json.channels[0].title;
				var id = json.channels[0].description.match(/> (\d+)</)[1];
				ForkTV.act_forktv_id = id;
				var modal = $('<div><div class="broadcast__text" style="text-align:left">' + Lampa.Lang.translate('fork_auth_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center">' + ForkTV.act_forktv_id + '</div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text">' + Lampa.Lang.translate('fork_modal_wait') + '</div></div>');
				Lampa.Modal.open({
					title: title,
					html: modal,
					size: 'small',
					mask: true,
					onBack: function onBack() {
						clearInterval(ping_auth);
						Lampa.Modal.close();
						Lampa.Controller.toggle(enabled);
					},
					onSelect: function onSelect() {
						ForkTV.copyCode(ForkTV.act_forktv_id);
					}
				});
				if (!Lampa.Platform.tv()) {
					setTimeout(function() {
						ForkTV.copyCode(id);
					}, 1000);
				}
				modal.find('a').on('click', function() {
					ForkTV.openBrowser('http://forktv.me');
				});
			});

			ping_auth = setInterval(function() {
				ForkTV.check(ForkTV.url, function() {
					Lampa.Modal.close();
					clearInterval(ping_auth);
					if (enabled == 'settings_component') Lampa.Activity.back();
					Lampa.Controller.toggle(enabled);
					Lampa.Storage.set('forktv_auth', true);
					ForkTV.parse();
				}, true);
			}, 5000);
		},
		check: function(url, call, ar) {
			this.network.clear();
			this.network.timeout(8000);
			this.network["native"](url + '?' + ForkTV.user_dev(), function(json) {
				if (json) {
					if (ar && json.channels.length > 1) {
						if (call) call(json);
					} else if (!ar) call(json);
				}
			}, function(a, c) {
				Lampa.Noty.show(ForkTV.network.errorDecode(a, c));
			});
		}
	};
	var Pub = {
		network: new Lampa.Reguest(),
		baseurl: 'https://api.srvkp.com/',
		tock: 'uirmqgdg5s3w9sq05udmjlca897oxrgk',
		token: Lampa.Storage.get('pub_access_token', 'uirmqgdg5s3w9sq05udmjlca897oxrgk'),
		openBrowser: function(url) {
			if (Lampa.Platform.is('tizen')) {
				var e = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view", url);
				tizen.application.launchAppControl(e, null, function(r) {}, function(e) {
					Lampa.Noty.show(e);
				});
			} else if (Lampa.Platform.is('webos')) {
				webOS.service.request("luna://com.webos.applicationManager", {
					method: "launch",
					parameters: {
						id: "com.webos.app.browser",
						params: {
							target: url
						}
					},
					onSuccess: function() {},
					onFailure: function(e) {
						Lampa.Noty.show(e);
					}
				});
			} else window.open(url, '_blank');
		},
		Auth_pub: function() {
			Pub.network.silent(Pub.baseurl + 'oauth2/device', function(json) {
				Lampa.Storage.set('pub_user_code', json.user_code);
				Lampa.Storage.set('pub_code', json.code);
				Pub.checkAdd();
			}, function(a, c) {
				Lampa.Noty.show(Pub.network.errorDecode(a, c));
			}, {
				'grant_type': 'device_code',
				'client_id': 'xbmc',
				'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
			});
		},
		checkAdd: function() {
			var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('pub_modal_title') + '</div><div class="broadcast__device selector" style="background-color:#fff;color:#000;text-align: center"></div></div><br><div class="broadcast__scan"><div></div></div><br><div class="broadcast__text"><b style="font-size:1em">' + Lampa.Lang.translate('pub_title_wait') + '</b></div></div>');
			Lampa.Modal.open({
				title: '',
				html: modal,
				size: 'small',
				mask: true,
				onBack: function onBack() {
					Lampa.Modal.close();
					clearInterval(ping_auth);
					Lampa.Controller.toggle('settings_component');
				},
				onSelect: function onSelect() {
					if (!Lampa.Platform.tv()) {
						Lampa.Utils.copyTextToClipboard(Lampa.Storage.get('pub_user_code'), function() {
							Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
						}, function() {
							Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
						});
					} else Pub.openBrowser('http://kino.pub');
				}
			});
			modal.find('a').on('click', function() {
				Pub.openBrowser('http://kino.pub');
			});
			modal.find('.selector').text(Lampa.Storage.get('pub_user_code'));
			var check = function check(url, call) {
				Pub.network.clear();
				Pub.network.timeout(8000);
				Pub.network.silent(url, function(json) {
					Lampa.Storage.set('pub_access_token', json.access_token);
					Lampa.Storage.set('pub_refresh_token', json.refresh_token);
					Pub.token = Lampa.Storage.get('pub_access_token');
					if (!Lampa.Platform.is('android')) var uas = navigator.userAgent.match(/((.*?))/i)[1].split(';');
					Pub.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + json.access_token, function(json) {
						Pub.network.silent(Pub.baseurl + 'v1/device/notify?access_token=' + Pub.token, function(json) {
							if (call) call();
						}, function(a, c) {
							Lampa.Noty.show(Pub.network.errorDecode(a, c));
						}, {
							'title': Lampa.Platform.is('android') ? 'KinoPub Android-Lampa' : uas.length > 3 ? 'Kinopub TV-Lampa' : uas[0] + ' ' + Lampa.Platform.get().toUpperCase(),
							'hardware': Lampa.Platform.is('android') ? 'Android 10' : uas[2],
							'software': Lampa.Platform.is('android') ? 'Android' : uas.length > 3 ? uas[1] : uas[0]
						});
					});
				}, false, {
					'grant_type': 'device_token',
					'client_id': 'xbmc',
					'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh',
					'code': Lampa.Storage.get('pub_code')
				});
			};
			ping_auth = setInterval(function() {
				check(Pub.baseurl + 'oauth2/device', function() {
					clearInterval(ping_auth);
					Lampa.Modal.close();
					Lampa.Storage.set('logined_pub', true);
					Lampa.Settings.update();
				});
			}, 5000);
		},
		refreshTok: function() {
			this.network.silent(Pub.baseurl + 'oauth2/token', function(json) {
				Lampa.Storage.set('pub_access_token', json.access_token);
				Lampa.Storage.set('pub_refresh_token', json.refresh_token);
				Pub.token = Lampa.Storage.get('pub_access_token');
				Lampa.Noty.show('ТОКЕН обновлён');
			}, function(a, c) {
				Lampa.Noty.show(Pub.network.errorDecode(a, c));
			}, {
				'grant_type': 'refresh_token',
				'refresh_token': Lampa.Storage.get('pub_refresh_token'),
				'client_id': 'xbmc',
				'client_secret': 'cgg3gtifu46urtfp2zp1nqtba0k2ezxh'
			});
		},
		userInfo: function(itm, ur) {
			var status = $('.settings-param__status', itm).removeClass('active error wait').addClass('wait');
			if (!Pub.token) status.removeClass('wait').addClass('error');
			else {
				this.network.silent(Pub.baseurl + 'v1/user?access_token=' + Pub.token, function(json) {
					$('.settings-param__' + (!ur ? 'name' : 'descr'), itm).html('<img width="30em" src="' + json.user.profile.avatar + '">  <span style="vertical-align: middle;"><b style="font-size:1.4em;color:#FF8C00">' + json.user.username + '</b> - ' + Lampa.Lang.translate('pub_title_left_days') + '<b>' + json.user.subscription.days + '</b> ' + Lampa.Lang.translate('pub_title_left_days_d') + '</span>');
					$('.settings-param__' + (!ur ? 'descr' : ''), itm).html(Lampa.Lang.translate('pub_title_regdate') + ' ' + Lampa.Utils.parseTime(json.user.reg_date * 1000).full + '<br>' + (json.user.subscription.active ? Lampa.Lang.translate('pub_date_end_pro') + ' ' + Lampa.Utils.parseTime(json.user.subscription.end_time * 1000).full : '<b style="color:#cdd419">' + Lampa.Lang.translate('pub_title_not_pro') + '</b>'));
					status.removeClass('wait').addClass('active');
					Lampa.Storage.set('logined_pub', true);
					Lampa.Storage.set('pro_pub', json.user.subscription.active);
				}, function(a, c) {
					status.removeClass('wait').addClass('error');
					Lampa.Storage.set('pro_pub', false);
					Lampa.Storage.set('pub_access_token', '');
					Lampa.Storage.set('logined_pub', false);
					Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
					Pub.userInfo(itm, ur);
				});
			}
		},
		info_device: function() {
			this.network.silent(Pub.baseurl + 'v1/device/info?access_token=' + Pub.token, function(json) {
				var enabled = Lampa.Controller.enabled().name;
				var opt = json.device.settings;
				var subtitle = {
					supportSsl: {
						title: 'Использовать SSL (https) для картинок и видео'
					},
					supportHevc: {
						title: 'HEVC или H.265 — формат Видеосжатия с применением более эффективных алгоритмов по сравнению с H.264/AVC. Убедитесь, что ваше устройство поддерживает Данный формат.'
					},
					support4k: {
						title: '4K или Ultra HD - фильм в сверхвысокой чёткости 2160p. Убедитесь, что ваше устройство и ТВ, поддерживает данный формат.'
					},
					mixedPlaylist: {
						title: 'Плейлист с AVC и HEVC потоками. В зависимости от настроек, устройство будет автоматически проигрывать нужный поток. Доступно только для 4К - фильмов. Убедитесь, что ваше устройство поддерживает данный формат плейлиста.'
					},
					HTTP: {
						title: 'Неадаптивный, качество через настройки (Настройки > плеер > качество видео), все аудио, нет сабов.'
					},
					HLS: {
						title: 'Неадаптивный, качество через настройки, одна аудиодорожка, нет сабов.'
					},
					HLS2: {
						title: 'Адаптивный, качество автоматом, одна аудиодорожка, нет сабов.'
					},
					HLS4: {
						title: 'Рекомендуется! - Адаптивный, качество автоматом, все аудио, сабы.'
					}
				};
				var item = [{
					title: 'Тип потока',
					value: opt.streamingType,
					type: 'streamingType'
				}, {
					title: 'Переключить сервер',
					value: opt.serverLocation,
					type: 'serverLocation'
				}];
				Lampa.Arrays.getKeys(opt).forEach(function(key) {
					var k = opt[key];
					if (!k.type && ['supportHevc', 'support4k'].indexOf(key) > -1) item.push({
						title: k.label,
						value: k.value,
						type: key,
						subtitle: subtitle[key] && subtitle[key].title,
						checkbox: k.type ? false : true,
						checked: k.value == 1 ? true : false
					});
				});

				function main(type, value) {
					var edited = {};
					item.forEach(function(a) {
						if (a.checkbox) edited[a.type] = a.checked ? 1 : 0;
					});
					if (type) edited[type] = value;
					Pub.network.silent(Pub.baseurl + 'v1/device/' + json.device.id + '/settings?access_token=' + Pub.token, function(json) {
						Lampa.Noty.show(Lampa.Lang.translate('pub_device_options_edited'));
						Lampa.Controller.toggle(enabled);
					}, function(a, c) {
						Lampa.Noty.show(Pub.network.errorDecode(a, c));
					}, edited);
				}
				Lampa.Select.show({
					items: item,
					title: Lampa.Lang.translate('pub_device_title_options'),
					onBack: main,
					onSelect: function(i) {
						var serv = [];
						i.value.value.forEach(function(i) {
							serv.push({
								title: i.label,
								value: i.id,
								subtitle: subtitle[i.label] && subtitle[i.label].title,
								selected: i.selected
							});
						});
						Lampa.Select.show({
							items: serv,
							title: i.title,
							onBack: main,
							onSelect: function(a) {
								main(i.type, a.value);
							}
						});
					}
				});
			}, function(a, c) {
				Lampa.Noty.show(Pub.network.errorDecode(a, c));
			});
		},
		delete_device: function(call) {
			this.network.silent(Pub.baseurl + 'v1/device/unlink?access_token=' + Pub.token, function(json) {
				Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
				Lampa.Storage.set('logined_pub', false);
				Lampa.Storage.set('pub_access_token', '');
				Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
				if (call) call();
			}, function(a, c) {
				Lampa.Noty.show(Lampa.Lang.translate('pub_device_dell_noty'));
				Lampa.Storage.set('logined_pub', false);
				Lampa.Storage.set('pub_access_token', '');
				Pub.token = Lampa.Storage.get('pub_access_token', Pub.tock);
				if (call) call();
				Lampa.Noty.show(Pub.network.errorDecode(a, c));
			}, {});
		}
	};

	function rezka(component, _object) {
		var network = new Lampa.Reguest();
		var extract = {};
		var prox = Protocol() + 'prox.lampa.stream/'; //'https://cors.lampa.stream/' + (IP ? 'ip' + IP + '/' : '');
		var embed = prox + 'http://voidboost.tv/';
		var object = _object;
		var select_id = '';
		var filter_items = {};
		var choice = component.getChoice('rezka');

		this.searchByKinopoisk = function(_object, id) {
			object = _object;
			select_id = id;
			getFirstTranlate(id, function(voice) {
				getFilm(id, voice);
			});
		};
		this.searchByImdbID = function(_object, id) {
			object = _object;
			select_id = id;
			getFirstTranlate(id, function(voice) {
				getFilm(id, voice);
			});
		};
		this.extendChoice = function(saved) {
			Lampa.Arrays.extend(choice, saved, true);
		};
		this.reset = function() {
			component.reset();
			choice = {
				season: 0,
				voice: 0,
				voice_name: ''
			};
			component.loading(true);
			getFirstTranlate(select_id, function(voice) {
				getFilm(select_id, voice);
			});
			component.saveChoice(choice);
		};
		this.filter = function(type, a, b) {
			choice[a.stype] = b.index;
			if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
			component.reset();
			filter();
			component.loading(true);
			choice.voice_token = extract.voice[choice.voice].token;
			getFilm(select_id, choice.voice_token);
			component.saveChoice(choice);
		};
		this.destroy = function() {
			network.clear();
			extract = null;
		};

		function getSeasons(voice, call) {
			var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
			network.clear();
			network.timeout(10000);
			network["native"](url, function(str) {
				extractData(str);
				call();
			}, function(a, c) {
				component.doesNotAnswer();
			}, false, {
				dataType: 'text'
			});
		}

		function getChoiceVoice() {
			var res = extract.voice[0];

			if (choice.voice_token) {
				extract.voice.forEach(function(voice) {
					if (voice.token === choice.voice_token) res = voice;
				});
			}

			return res;
		}

		function getFirstTranlate(id, call) {
			network.clear();
			network.timeout(10000);

			network["native"](embed + 'embed/' + id, function(str) {
				extractData(str);
				if (extract.voice.length) call(getChoiceVoice().token);
				else component.doesNotAnswer(object.movie.title);
			}, function(a, c) {
				component.doesNotAnswer(a.status == 404 && a.responseText && (a.responseText.indexOf('Видео не найдено') !== -1 || a.responseText.indexOf('Not Found') !== -1) ? object.movie.title : '');
			}, false, {
				dataType: 'text'
			});
		}

		function getEmbed(url) {
			network.clear();
			network.timeout(10000);
			network.silent(url, function(str) {
				component.loading(false);
				extractData(str);
				filter();
				append();
			}, function(a, c) {
				component.doesNotAnswer();
			}, false, {
				dataType: 'text'
			});
		}

		function getFilm(id, voice) {
			var url = embed;
			if (voice) {
				if (extract.season.length) {
					var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
					url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
					return getSeasons(voice, function() {
						var check = extract.season.filter(function(s) {
							return s.id == ses;
						});

						if (!check.length) {
							choice.season = extract.season.length - 1;
							url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[choice.season].id + '&h=gidonline.io';
						}

						getEmbed(url);
					});
				} else {
					url += 'movie/' + voice + '/iframe?h=gidonline.io';
					getEmbed(url);
				}
			} else {
				url += 'embed/' + id;
				getEmbed(url);
			}
		}

		function filter() {
			filter_items = {
				season: extract.season.map(function(v) {
					return v.name;
				}),
				voice: extract.season.length ? extract.voice.map(function(v) {
					return v.name;
				}) : []
			};

			if (choice.voice_name) {
				var inx = filter_items.voice.map(function(v) {
					return v.toLowerCase();
				}).indexOf(choice.voice_name.toLowerCase());
				if (inx == -1) choice.voice = 0;
				else if (inx !== choice.voice) {
					choice.voice = inx;
				}
			}

			if (!extract.season[choice.season]) choice.season = 0;
			else choice.seasons = filter_items.season.length;

			component.filter(filter_items, choice);
		}

		function parseSubtitles(str) {
			var subtitles = [];
			var subtitle = str.match("'subtitle': '(.*?)'");

			if (subtitle) {
				subtitles = component.parsePlaylist(subtitle[1]).map(function(item) {
					return {
						label: item.label,
						url: item.links[0]
					};
				});
			}

			return subtitles.length ? subtitles : false;
		}

		function extractItems(str) {
			try {
				var items = component.parsePlaylist(str).map(function(item) {
					var quality = item.label.match(/(\d\d\d+)p/);
					var links;

					links = item.links.filter(function(url) {
						return /\.mp4$/i.test(url);
					});

					if (!links.length) links = item.links;
					return {
						label: item.label,
						quality: quality ? parseInt(quality[1]) : NaN,
						file: links[0]
					};
				});
				items.sort(function(a, b) {
					if (b.quality > a.quality) return 1;
					if (b.quality < a.quality) return -1;
					if (b.label > a.label) return 1;
					if (b.label < a.label) return -1;
					return 0;
				});
				return items;
			} catch (e) {}

			return [];
		}

		function getStream(element, call, error) {
			if (element.stream) return call(element.stream);
			var url = embed;

			if (element.season) {
				url += 'serial/' + element.voice.token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
			} else {
				url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
			}
			network.clear();
			network.timeout(5000);
			network["native"](url, function(str) {
				var videos = str.match("'file': '(.*?)'");

				if (videos) {
					var video = decode(videos[1]),
						file = '',
						quality = false;
					var items = extractItems(video);

					if (items && items.length) {
						file = items[0].file;
						quality = {};
						items.forEach(function(item) {
							quality[item.label] = item.file;
						});
					}

					if (file) {
						element.stream = file;
						element.qualitys = quality;
						element.subtitles = parseSubtitles(str);
						call(element.stream);
					} else error();
				} else error();
			}, error, false, {
				dataType: 'text'
			});
		}

		function decode(data) {
			if (data.charAt(0) !== '#') return data;

			var enc = function enc(str) {
				return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
					return String.fromCharCode('0x' + p1);
				}));
			};

			var dec = function dec(str) {
				return decodeURIComponent(atob(str).split('').map(function(c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				}).join(''));
			};

			var trashList = TRASH_R;

			var x = data.substring(2);
			trashList.forEach(function(trash) {
				x = x.replace('//_//' + enc(trash), '');
			});

			try {
				x = dec(x);
			} catch (e) {
				x = '';
			}

			return x;
		}

		function extractData(str) {
			extract.voice = [];
			extract.season = [];
			extract.episode = [];
			str = str.replace(/\n/g, '');
			var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
			var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
			var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');

			if (sesons) {
				var select = $('<select>' + sesons[1] + '</select>');
				$('option', select).each(function() {
					extract.season.push({
						id: $(this).attr('value'),
						name: $(this).text()
					});
				});
			}

			if (voices) {
				var _select = $('<select>' + voices[1] + '</select>');

				$('option', _select).each(function() {
					var token = $(this).attr('data-token');

					if (token) {
						extract.voice.push({
							token: token,
							name: $(this).text(),
							id: $(this).val()
						});
					}
				});
			}

			if (episod) {
				var _select2 = $('<select>' + episod[1] + '</select>');

				$('option', _select2).each(function() {
					extract.episode.push({
						id: $(this).attr('value'),
						name: $(this).text()
					});
				});
			}
		}

		function append() {
			component.reset();
			var items = [];

			if (extract.season.length) {
				extract.episode.forEach(function(episode) {
					items.push({
						title: episode.name,
						quality: '720p ~ 1080p',
						season: parseInt(extract.season[Math.min(extract.season.length - 1, choice.season)].id),
						episode: parseInt(episode.id),
						voice: extract.voice[choice.voice],
						voice_name: extract.voice[choice.voice].name
					});
				});
			} else {
				extract.voice.forEach(function(voice) {
					items.push({
						title: voice.name.length > 3 ? voice.name : object.movie.title,
						quality: '720p ~ 1080p',
						voice: voice,
						info: '',
						voice_name: voice.name
					});
				});
			}

			component.draw(items, {
				onEnter: function onEnter(item, html) {
					getStream(item, function(stream) {
						var first = {
							url: stream,
							timeline: item.timeline,
							quality: item.qualitys,
							subtitles: item.subtitles,
							title: item.title
						};
						Lampa.Player.play(first);

						if (item.season) {
							var playlist = [];
							items.forEach(function(elem) {
								var cell = {
									url: function url(call) {
										getStream(elem, function(stream) {
											cell.url = stream;
											cell.quality = elem.qualitys;
											call.subtitles = elem.subtitles;
											elem.mark();
											call();
										}, function() {
											cell.url = '';
											call();
										});
									},
									timeline: elem.timeline,
									title: elem.title
								};
								if (elem == item) cell.url = stream;
								playlist.push(cell);
							});
							Lampa.Player.playlist(playlist);
						} else {
							Lampa.Player.playlist([first]);
						}
						item.mark();
					}, function(e) {
						Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
					});
				},
				onContextMenu: function onContextMenu(item, html, data, call) {
					getStream(item, function(stream) {
						call({
							file: stream,
							quality: item.qualitys
						});
					});
				}
			});
		}
	}

	function cdnmovies(component, _object) {
		var network = new Lampa.Reguest();
		var extract = [];
		var medias;
		var object = _object;
		var select_title = '';
		var filter_items = {};
		var wait_similars;
		var prefer_old = false;
		var choice = component.getChoice('cdnmovies');
		var host = 'https://cdnmovies.net';
		var old_embed = 'https://1f29036bcf55d.sarnage.cc/';
		var new_embed = 'https://cdnmovies-stream.online/';

		var proxy = 'https://cors.lampa.stream/' + (IP ? 'ip' + IP + '/' : '');
		var embed = 'https://skinny-wilderness.cdnmovies-stream.online/';
		var iframe_proxy = false;

		function cdn_api_search(api, callback, error) {
			var call_success = function call_success(str) {
				if (callback) callback(str || '');
			};

			var call_error = function call_error(a, c) {
				if ((a.status == 404 || a.status == 403) && a.responseText && (a.responseText.indexOf('<title>Not Found</title>') !== -1 || a.responseText.indexOf('Не найдено!') !== -1 || a.responseText.indexOf('Контент не найден или недоступен в вашем регионе!') !== -1) || a.status == 0 && a.statusText !== 'timeout') {
					if (callback) callback('');
				} else if (error) error(network.errorDecode(a, c));
			};

			if (iframe_proxy) {
				component.proxyCall('GET', embed + api, 10000, null, call_success, call_error);
			} else {
				var meta = $('head meta[name="referrer"]');
				var referrer = meta.attr('content') || 'never';
				meta.attr('content', 'origin');

				try {
					network.clear();
					network.timeout(10000);
					network["native"](embed + api, call_success, call_error, false, {
						dataType: 'text',
						headers: Lampa.Platform.is('android') ? {
							'Origin': host,
							'Referer': host + '/'
						} : {}
					});
				} finally {
					meta.attr('content', referrer);
				}
			}
		}
		this.searchs = function(_object, kinopoisk_id) {
			object = _object;
			select_title = object.search || object.movie.title;

			var empty = function empty() {
				component.doesNotAnswer(select_title);
			};

			var error = component.empty.bind(component);
			var api = (+kinopoisk_id ? 'kinopoisk/' : 'imdb/') + kinopoisk_id + '/iframe';
			cdn_api_search(api, function(str) {
				parse(str || '', function() {
					if (!object.clarification && object.movie.imdb_id && kinopoisk_id != object.movie.imdb_id) {
						cdn_api_search('imdb/' + object.movie.imdb_id + '/iframe', function(str) {
							parse(str || '', empty);
						}, error);
					} else empty();
				});
			}, error);
		};

		this.extendChoice = function(saved) {
			Lampa.Arrays.extend(choice, saved, true);
		};
		this.reset = function() {
			component.reset();
			choice = {
				season: 0,
				voice: 0,
				order: 0,
				voice_name: ''
			};
			filter();
			append(filtred());
			component.saveChoice(choice);
		};
		this.filter = function(type, a, b) {
			choice[a.stype] = b.index;
			if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
			component.reset();
			filter();
			append(filtred());
			component.saveChoice(choice);
		};
		this.destroy = function() {
			network.clear();
		};

		function parse(str, empty) {
			str = str.replace(/\n/g, '');
			var video;
			var app = str.match(/(<div id="app" data-page=[^>]*>)/);

			if (app) {
				var page = $(app[1] + '</div>').attr('data-page') || '';
				var json;

				try {
					json = page && JSON.parse(page);
				} catch (e) {}

				var player = json && json.props && json.props.player && decode(json.props.player);

				try {
					video = player && JSON.parse(player);
				} catch (e) {}
			}

			if (video) {
				component.loading(false);
				extract = video;
				filter();
				append(filtred());
			} else empty();
		}

		function decode(data) {
			if (data.charAt(0) !== '#') return data;

			var enc = function enc(str) {
				return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
					return String.fromCharCode('0x' + p1);
				}));
			};

			var dec = function dec(str) {
				return decodeURIComponent(atob(str).split('').map(function(c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				}).join(''));
			};

			var trashList = ['-*frofpscprpamfpQ*45612.3256dfrgd', '54vjfhcgdbrydkcfkndz568436fred+*d', 'lvfycgndqcydrcgcfg+95147gfdgf-zd*', 'az+-erw*3457edgtjd-feqsptf/re*q*Y', 'df8vg69r9zxWdlyf+*fgx455g8fh9z-e*Q'];
			var x = data.substring(2);
			trashList.forEach(function(trash) {
				x = x.replace('//' + enc(trash), '');
			});

			try {
				x = dec(x);
			} catch (e) {
				x = '';
			}

			return x;
		}

		function extractItemsPlaylist(str, url) {
			if (!str) return [];

			try {
				var items = component.parsePlaylist(str).map(function(item) {
					var quality = item.label.match(/(\d\d\d+)p/);
					var link = item.links[0] || '';
					link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');
					return {
						label: item.label,
						quality: quality ? parseInt(quality[1]) : NaN,
						file: link
					};
				});
				items.sort(function(a, b) {
					if (b.quality > a.quality) return 1;
					if (b.quality < a.quality) return -1;
					if (b.label > a.label) return 1;
					if (b.label < a.label) return -1;
					return 0;
				});
				return items;
			} catch (e) {}

			return [];
		}

		function parseStream(element, call, error, itemsExtractor, str, url) {
			var file = '';
			var quality = false;
			var items = itemsExtractor(str, url);

			if (items && items.length) {
				file = items[0].file;
				quality = {};
				items.forEach(function(item) {
					quality[item.label] = item.file;
				});
			}
			if (file) {
				element.stream = file;
				element.qualitys = quality;
				call(element.stream);
			} else error();
		}

		function getStream(element, call, error) {
			if (element.stream) return call(element.stream);
			var url = element.file || '';

			if (url.charAt(0) === '[') {
				parseStream(element, call, error, extractItemsPlaylist, url, '');
				return;
			}

			link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');

			if (url) {
				element.stream = url;
				element.qualitys = false;
				call(element.stream);
			} else error();
		}

		function filter() {
			filter_items = {
				season: [],
				voice: [],
				order: []
			};
			extract.forEach(function(season) {
				if (season.folder) filter_items.season.push(season.title);
			});
			if (!filter_items.season[choice.season]) choice.season = 0;

			if (extract[choice.season] && extract[choice.season].folder) {
				component.order.forEach(function(i) {
					filter_items.order.push(i.title);
				});
				extract[choice.season].folder.forEach(function(f) {
					f.folder.forEach(function(t) {
						if (filter_items.voice.indexOf(t.title) == -1) filter_items.voice.push(t.title);
					});
				});
			}

			if (!filter_items.voice[choice.voice]) choice.voice = 0;

			if (choice.voice_name) {
				var inx = filter_items.voice.indexOf(choice.voice_name);
				if (inx == -1) choice.voice = 0;
				else if (inx !== choice.voice) {
					choice.voice = inx;
				}
			}

			component.filter(filter_items, choice);
		}

		function parseSubs(str) {
			var subtitles = component.parsePlaylist(str).map(function(item) {
				link = link.replace('/sundb.coldcdn.xyz/', '/sundb.nl/');
				return {
					label: item.label,
					url: item.links[0]
				};
			});
			return subtitles.length ? subtitles : false;
		}

		function filtred() {
			var filtred = [];
			extract.forEach(function(data) {
				if (data.folder) {
					if (data.title == filter_items.season[choice.season]) {
						data.folder.forEach(function(se) {
							se.folder.forEach(function(eps) {
								if (eps.title == filter_items.voice[choice.voice]) {
									var m = Lampa.Arrays.getValues(medias).filter(function(itm) {
										return itm.translation == eps.title;
									});
									filtred.push({
										file: eps.file,
										title: Lampa.Lang.translate('full_episode') + ' ' + parseInt(se.title.match(/\d+/)),
										episode: parseInt(se.title.match(/\d+/)),
										season: parseInt(data.title.match(/\d+/)),
										quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
										info: Lampa.Utils.shortText(eps.title, 50)
									});
								}
							});
						});
					}
				} else {
					var m = Lampa.Arrays.getValues(medias).filter(function(itm) {
						return itm.translation == data.title;
					});
					filtred.push({
						file: data.file,
						title: data.title,
						quality: m.length ? (m[0].source_quality + ' - ' + m[0].quality + 'p') : '',
						info: '',
						subtitles: data.subtitle ? parseSubs(data.subtitle) : false
					});
				}
			});
			return component.order[choice.order].id == 'invers' ? filtred.reverse() : filtred;
		}

		function append(items) {
			component.reset();
			component.draw(items, {
				similars: wait_similars,
				onEnter: function onEnter(item, html) {
					if (item.loading) return;
					item.loading = true;
					getStream(item, function(stream) {
						item.loading = false;
						var first = {
							url: stream,
							timeline: item.timeline,
							quality: item.qualitys,
							subtitle: item.subtitles,
							title: item.title
						};
						Lampa.Player.play(first);

						if (item.season) {
							var playlist = [];
							items.forEach(function(elem) {
								var cell = {
									url: function url(call) {
										getStream(elem, function(stream) {
											cell.url = stream;
											cell.quality = elem.qualitys;
											cell.subtitles = elem.subtitles;
											elem.mark();
											call();
										}, function() {
											cell.url = '';
											call();
										});
									},
									timeline: elem.timeline,
									title: elem.title
								};
								if (elem == item) cell.url = stream;
								playlist.push(cell);
							});
							Lampa.Player.playlist(playlist);
						} else {
							Lampa.Player.playlist([first]);
						}

						if (item.subtitles && Lampa.Player.subtitles) Lampa.Player.subtitles(item.subtitles);
						item.mark();
					}, function(data) {
						item.loading = false;
						Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
					});
				},
				onContextMenu: function onContextMenu(item, html, data, call) {
					getStream(item, function(stream) {
						call({
							file: stream,
							quality: item.qualitys
						});
					}, function(data) {
						Lampa.Noty.show(data ? network.errorDecode(data) : Lampa.Lang.translate('modss_nolink'));
					});
				}
			});
		}
	}

	var proxyInitialized = false;
	var proxyWindow;
	var proxyCalls = {};

	function component(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true
		});
		var files = new Lampa.Explorer(object);
		var filter = new Lampa.Filter(object);
		var sources = {};
		var extract = {};
		var last;
		var source;
		var balanser;
		var initialized;
		var balanser_timer;
		var images = [];
		var number_of_requests = 0;
		var number_of_requests_timer;
		var life_wait_times = 0;
		var life_wait_timer;
		var back_url;
		var checkH = 0;
		var secret = '';
		var secret_part = '';
		var secret_timestamp = null;
		var last_request_url = '';
		var filter_sources = {};
		var filter_translate = {
			season: Lampa.Lang.translate('torrent_serial_season'),
			voice: Lampa.Lang.translate('torrent_parser_voice'),
			source: Lampa.Lang.translate('settings_rest_source')
		};
		var filter_find = {
			season: [],
			voice: [],
			server: [],
			type: []
		};
		this.initialize = function() {
			var _this = this;
			this.loading(true);
			balanser = this.getLastChoiceBalanser();
			var show_filter = object.movie.number_of_seasons || balanser == 'pub' || balanser == 'bazon' || balanser == 'hdrezka';
			filter.onSearch = function(value) {
				Lampa.Activity.replace({
					search: value,
					clarification: true
				});
			};
			filter.onBack = function() {
				_this.start();
			};
			filter.render().find('.selector').on('hover:enter', function() {
				clearInterval(balanser_timer);
			});
			filter.render().find('.filter--search').appendTo(filter.render().find('.torrent-filter'));
			filter.onSelect = function(type, a, b) {
				if (a.bal) {
					filter.render().find('.filter--sort').trigger('hover:enter');
				} else if (type == 'filter') {
					if (a.reset) {
						_this.replaceChoice({
							season: 0,
							voice: 0,
							voice_url: '',
							voice_name: ''
						});
						setTimeout(function() {
							Lampa.Select.close();
							Lampa.Activity.replace();
						}, 10);
					} else {
						if (['rezka', 'cdnmovies'].indexOf(balanser) >= 0) {
							setTimeout(Lampa.Select.close, 10);
							return source.filter(type, a, b);
						}
						var choice = _this.getChoice();
						var url;
						if (a.stype == 'voice') {
							url = filter_find[a.stype][b.index].url;
							choice.voice_name = filter_find.voice[b.index].title;
							choice.voice_url = url;
						}
						if (a.stype == 'season') {
							url = filter_find.season[b.index].url;
						}
						choice[a.stype] = b.index;
						_this.replaceChoice(choice, balanser);
						setTimeout(Lampa.Select.close, 10);
						_this.loading(true);
						_this.reset();
						if (a.stype == 'server' || a.stype == 'type') {
							if (a.stype == 'server') Lampa.Storage.set('pub_server', b.index);
							if (a.stype == 'type') Lampa.Storage.set('pub_type_striming', b.index);
							_this.initialize();
						} else if (url) {
							_this.request(_this.requestParams(url));
						} else _this.parse(extract);
					}
				} else if (type == 'sort') {
					if (a.ghost) {
						Lampa.Noty.show('Доступно в VIP подписке');
					} else {
						Modss.getIp();
						Lampa.Select.close();
						object.modss_custom_select = a.source;
						_this.changeBalanser(a.source);
					}
				}
				if (object.movie.number_of_seasons || balanser == 'pub' || balanser == 'bazon') filter.render().find('.filter--filter').show();
				else filter.render().find('.filter--filter').hide();
			};

			if (show_filter) filter.render().find('.filter--filter').show();
			else filter.render().find('.filter--filter').hide();
			filter.render().find('.filter--sort').on('hover:enter', function() {
				$('body').find('.selectbox__title').text(Lampa.Lang.translate('modss_balanser'));
			});
			if (filter.addButtonBack && !$('.filter--back').length) filter.addButtonBack();
			filter.render().find('.filter--sort span').text(Lampa.Lang.translate('modss_balanser'));
			scroll.body().addClass('torrent-list');

			this.createSource().then(function(wait) {
				if (!window.filmix) {
					window.filmix = {
						max_qualitie: 720,
						is_max_qualitie: false,
						auth: false,
						date: ''
					};
				}

				files.appendFiles(scroll.render());
				files.appendHead(filter.render());
				if (['seasonvar', 'kinotochka', 'hdrezka', 'pub', 'kinokrad', 'kinobase', 'filmix', 'videocdn', 'eneida'].indexOf((balanser.indexOf('<') == -1 ? balanser.toLowerCase() : balanser.split('<')[0].toLowerCase())) == -1) {
					filter.render().find('.filter--search').addClass('hide');
				}
				scroll.minus(files.render().find('.explorer__files-head'));
				Lampa.Controller.enable('content');
				_this.search();
			})["catch"](function(e) {
				if (e && !e.find) {
					files.appendHead(filter.render());
					_this.empty();
					_this.activity.loader(false);
				} else _this.noConnectToServer(e);
			});
		};
		this.updateBalanser = function(balanser_name) {
			var last_select_balanser = Lampa.Storage.cache('modss_last_balanser', 3000, {});
			last_select_balanser[object.movie.id] = balanser_name;
			Lampa.Storage.set('modss_last_balanser', last_select_balanser);
		};
		this.changeBalanser = function(balanser_name) {
			this.updateBalanser(balanser_name);
			Lampa.Storage.set('online_balanser', balanser_name);
			var to = this.getChoice(balanser_name);
			var from = this.getChoice();
			if (from.voice_name) to.voice_name = from.voice_name;
			this.saveChoice(to, balanser_name);
			Lampa.Activity.replace();
		};
		this.requestParams = function(url) {
			var query = [];
			query.push('id=' + object.movie.id);
			if (object.movie.imdb_id) query.push('imdb_id=' + (object.movie.imdb_id || ''));
			if (object.movie.kinopoisk_id || object.movie.kinopoisk_ID) query.push('kinopoisk_id=' + (object.movie.kinopoisk_id || object.movie.kinopoisk_ID || ''));
			query.push('title=' + encodeURIComponent(object.clarification ? object.search : object.movie.title || object.movie.name));
			query.push('original_title=' + encodeURIComponent(object.movie.original_title || object.movie.original_name));
			query.push('serial=' + (object.movie.name ? 1 : 0));
			query.push('original_language=' + (object.movie.original_language || ''));
			query.push('year=' + ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4));
			query.push('source=' + object.movie.source);
			query.push('search=' + encodeURIComponent(object.search));
			query.push('clarification=' + (object.clarification ? 1 : 0));
			query.push('logged=' + logged);
			query.push('vers=' + version_modss);
			query.push('prefer_dash=' + (Lampa.Storage.field('online_dash') === true));
			query.push('ip=' + IP);
			query.push('server=' + Lampa.Storage.field('pub_server', 1));
			query.push('hevc=' + Lampa.Storage.field('online_hevc', true));
			query.push('type=' + this.getChoice(balanser).type);
			query.push('pro_pub=' + Lampa.Storage.get('pro_pub', false));
			if (Lampa.Storage.get('pro_pub', false)) query.push('ptoken=' + Pub.token);
			if (Filmix.token) query.push('token=' + Filmix.token);
			query.push('cub_id=YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20=');
			query.push('uid=72ba41c6eee8f7862b7c57cbc956fe2f_86324');
			if (cards) {
				var notices = Lampa.Storage.get('account_notice', []).filter(function(n) {
					return n.card_id == cards.id;
				});
				if (notices.length) {
					var notice = notices.find(function(itm) {
						return Lampa.Utils.parseTime(itm.date).full == Lampa.Utils.parseTime(Date.now()).full;
					});
					if (notice) {
						query.push('s=' + notice.season);
						query.push('ep=' + notice.episode);
					}
				}
			}
			return url + (url.indexOf('?') >= 0 ? '&' : '?') + query.join('&');
		};
		this.getLastChoiceBalanser = function() {
			var last_select_balanser = Lampa.Storage.cache('modss_last_balanser', 3000, {});
			var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
			if (priority_balanser == undefined) priority_balanser = Modss.balansPrf;
			if (last_select_balanser[object.movie.id]) {
				return last_select_balanser[object.movie.id];
			} else {
				return priority_balanser ? priority_balanser : filter_sources.length ? filter_sources[0] : '';
			}
		};
		this.startSource = function(json) {
			return new Promise(function(resolve, reject) {
				json.balanser.forEach(function(j) {
					var name = j.name.toLowerCase();
					sources[j.name] = {
						url: j.url,
						name: j.title,
						vip: j.vip,
						show: typeof j.show == 'undefined' ? true : j.show
					};
				});

				sources.cdnmovies = {
					url: false,
					class: cdnmovies,
					name: 'CDNmovies',
					vip: false,
					show: true
				};
				sources.rezka = {
					url: false,
					class: rezka,
					name: 'Rezka',
					vip: false,
					show: true
				};

				filter_sources = Lampa.Arrays.getKeys(sources);
				if (filter_sources.length) {
					var priority_balanser = Lampa.Storage.get('priority_balanser', Modss.balansPrf);
					if (priority_balanser == undefined) priority_balanser = Modss.balansPrf;

					var last_select_balanser = Lampa.Storage.cache('modss_last_balanser', 3000, {});
					if (last_select_balanser[object.movie.id]) {
						balanser = last_select_balanser[object.movie.id];
					} else {
						balanser = priority_balanser; //Lampa.Storage.get('online_balanser', priority_balanser);
					}

					if (!sources[balanser]) balanser = priority_balanser;
					if (!sources[balanser]) balanser = filter_sources[0];
					if (!sources[balanser].show && !object.modss_custom_select) balanser = filter_sources[0];
					source = sources[balanser].url;
					resolve('Loaded - ' + object.search + ' _ ' + json.time);
				} else {
					reject();
				}
			});
		};
		this.lifeSource = function() {
			var _this2 = this;
			return new Promise(function(resolve, reject) {
				var url = _this2.requestParams(API + 'lifes/' + object.movie.id);
				var red = false;
				var gou = function gou(json, any) {
					var last_balanser = _this2.getLastChoiceBalanser();
					if (!red) {
						var _filter = json.online.filter(function(c) {
							return any ? c.show : c.show && (c.name == last_balanser);
						});
						if (_filter.length) {
							red = true;
							resolve({
								balanser: json.online.filter(function(c) {
									return c.show;
								}),
								time: json.load.search
							});
						} else if (any) {
							reject('Not found - ' + object.search + ' _ ' + json.load.search);
						}
					}
				};
				var fin = function fin(call) {
					network.timeout(10000);
					network.silent(url, function(json) {
						if (json.FindVoice) {
							if (cards) {
								var notices = Lampa.Storage.get('account_notice', []).filter(function(n) {
									return n.card_id == cards.id;
								});
								if (notices.length) {
									var notice = notices.find(function(itm) {
										return Lampa.Utils.parseTime(itm.date).full == Lampa.Utils.parseTime(Date.now()).full;
									});
									if (notice) {
										notice.find = json.FindVoice;
										Modss.Notice(notice);
									}
								}
							}
						}
						life_wait_times++;
						filter_sources = [];
						sources = {};
						json.online.forEach(function(j) {
							var name = j.name.toLowerCase();
							if (j.show) sources[j.name] = {
								url: j.url,
								name: j.title,
								vip: j.vip,
								show: typeof j.show == 'undefined' ? true : j.show
							};
						});
						sources.cdnmovies = {
							url: false,
							class: cdnmovies,
							name: 'CDNmovies',
							vip: false,
							show: true
						};
						sources.rezka = {
							url: false,
							class: rezka,
							name: 'Rezka',
							vip: false,
							show: true
						};

						filter_sources = Lampa.Arrays.getKeys(sources);
						filter.set('sort', filter_sources.map(function(e) {
							return {
								title: sources[e].name,
								source: e,
								selected: e == balanser,
								ghost: sources[e].vip
							};
						}).sort(function(a, b) {
							return a.ghost - b.ghost;
						}));
						filter.chosen('sort', [sources[balanser] ? sources[balanser].name.split(' ')[0] : balanser]);

						gou(json);
						if (life_wait_times > 15 || json.ready) {
							filter.render().find('.modss-balanser-loader').remove();
							gou(json, true);
						} else {
							life_wait_timer = setTimeout(fin, 1000);
						}
					}, function(e) {
						life_wait_times++;
						if (life_wait_times > 15) {
							reject();
						} else {
							if (e.statusText == 'timeout') return reject({
								error: 'timeout - ' + object.search
							});
							life_wait_timer = setTimeout(fin, 1000);
						}
					});
				};
				fin();
			});
		};
		this.createSource = function(load) {
			var _this3 = this;
			return new Promise(function(resolve, reject) {
				var url = _this3.requestParams(API + 'eventss/' + object.movie.id + '?');
				network.timeout(15000);
				network.silent(url, function(json) {
					if (json.vip || json.error) return reject(json);
					if (json.life) {

						filter.render().find('.filter--sort').append('<span class="modss-balanser-loader" style="width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em"></span>');
						_this3.lifeSource().then(_this3.startSource).then(resolve)["catch"](reject);

					} else {
						_this3.startSource(json).then(resolve)["catch"](reject);
					}
				}, reject);
			});
		};
		this.create = function() {
			return this.render();
		};
		this.search = function() {
			this.loading(true);
			this.filter({
				source: filter_sources
			}, this.getChoice());
			this.find();
		};
		this.find = function() {
			if (source) this.request(this.requestParams(source));
			else {
				source = new sources[balanser].class(this, object);
				var kp_id = +object.movie.kinopoisk_id || +object.movie.kinopoisk_ID;
				if (['rezka', 'cdnmovies'].indexOf(balanser) >= 0) {
					if (source.searchByImdbID && object.movie.imdb_id) source.searchByImdbID(object, object.movie.imdb_id);
					else if (source.searchByKinopoisk && kp_id) source.searchByKinopoisk(object, kp_id);
					else if (source.searchByTitle) source.searchByTitle(object, object.search);
					else source.searchs(object, kp_id || object.movie.imdb_id);
				}
			}
		};
		this.request = function(url) {
			number_of_requests++;
			if (number_of_requests < 10) {
				last_request_url = url;
				network["native"](url, this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
					dataType: 'json'
				});
				clearTimeout(number_of_requests_timer);
				number_of_requests_timer = setTimeout(function() {
					number_of_requests = 0;
				}, 4000);
			} else this.empty();
		};
		this.toPlayElement = function(file) {
			if (balanser == 'qiwi') {
				for (var key in file.qualitys) {
					file.qualitys[key] = file.qualitys[key].replace(/\/s\/(.*?)\//gi, secret);
				}
				file.url = Lampa.Arrays.getValues(file.qualitys)[0];
			}
			var play = {
				title: file.title,
				url: file.url,
				quality: file.qualitys,
				timeline: file.timeline,
				subtitles: file.subtitles,
				translate: {
					tracks: file.audio_tracks,
					subs: file.subs_tracks
				},
				callback: file.mark
			};
			return play;
		};
		this.checkHash = function(params) {
			var _this = this;
			return new Promise(function(resolve, reject) {
				if (checkH == 20) {
					checkH = 0;
					return reject({});
				}
				var num = Lampa.Utils.uid(4);
				var reg = /\/s\/(.*?)\//gi;
				var h = params.url.match(reg);
				var newHash = h[0].substring(0, h[0].length - 2) + num + '/';
				var newU = params.url.replace(reg, newHash);
				var timestamp = new Date().getTime();
				var cache_timestamp = timestamp - 1000 * 60 * 10;
				if (secret && secret_timestamp && secret_timestamp > cache_timestamp) {
					for (var key in params.qualitys) {
						params.qualitys[key] = params.qualitys[key].replace(reg, secret);
					}
					params.url = Lampa.Arrays.getValues(params.qualitys)[0];
					resolve(params);
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							if (xhr.status === 200) {
								secret = newHash;
								secret_timestamp = timestamp;
								for (var key in params.qualitys) {
									params.qualitys[key] = params.qualitys[key].replace(reg, newHash);
								}
								params.url = Lampa.Arrays.getValues(params.qualitys)[0];
								checkH = 0;
								resolve(params);
							} else {
								checkH++;
								_this.checkHash(params).then(resolve, reject);
							}
						}
					};
					xhr.open("HEAD", newU, true);
					xhr.send();
				}
			});
		};
		this.setDefaultQuality = function(data) {
			if (Lampa.Arrays.getKeys(data.quality).length) {
				for (var q in data.quality) {
					if (parseInt(q) == Lampa.Storage.field('video_quality_default')) {
						data.url = data.quality[q];
						break;
					}
				}
			}
		};
		this.getFileUrl = function(file, call) {
			if (balanser == 'hdr' && navigator.userAgent.toLowerCase().indexOf('android') >= 0 && !Lampa.Platform.is('android')) return Lampa.Platform.install('apk');
			if (balanser == 'qiwi') {
				this.checkHash(file).then(function(data) {
					call(data, {});
				}, function(err) {
					call(false, {});
				});
			} else if (file.method == 'play') call(file, {});
			else {
				Lampa.Loading.start(function() {
					Lampa.Loading.stop();
					Lampa.Controller.toggle('content');
					network.clear();
				});
				network["native"](file.url, function(json) {
					Lampa.Loading.stop();
					call(json, json);
				}, function() {
					Lampa.Loading.stop();
					call(false, {});
				});
			}
		};
		this.display = function(videos) {
			var _this4 = this;
			this.draw(videos, {
				onEnter: function onEnter(item, html) {
					_this4.getFileUrl(item, function(json, json_call) {
						if (json && json.url) {
							var playlist = [];
							var first = _this4.toPlayElement(item);
							first.url = json.url;
							first.quality = json_call.quality || item.qualitys;
							first.subtitles = json.subtitles;
							_this4.setDefaultQuality(first);
							if (item.season) {
								videos.forEach(function(elem) {
									var cell = _this4.toPlayElement(elem);
									if (images[elem.episode - 1]) {
										cell.template = 'selectbox_icon';
										cell.icon = '<img class="size-youtube" src="' + images[elem.episode - 1].src + '" alt="icon">';
									}
									if (elem == item) cell.url = json.url;
									else {
										if (elem.method == 'call') {
											if (Lampa.Platform.is('android') && Lampa.Storage.field('player') == 'android') {
												cell.url = elem.stream;
											} else {
												cell.url = function(call) {
													_this4.getFileUrl(elem, function(stream, stream_json) {
														if (stream.url) {
															cell.url = stream.url;
															cell.quality = stream_json.quality || elem.qualitys;
															cell.subtitles = stream.subtitles;
															cell.translate = {
																tracks: stream_json.audio_tracks,
																subs: stream_json.subs_tracks
															};
															_this4.setDefaultQuality(cell);
															elem.mark();
														} else {
															cell.url = '';
															Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
														}
														call();
													}, function() {
														cell.url = '';
														call();
													});
												};
											}
										} else {
											cell.url = elem.url;
										}
									}
									_this4.setDefaultQuality(cell);
									playlist.push(cell);
								});
								Lampa.Player.playlist(playlist);
							} else {
								playlist.push(first);
							}
							if (playlist.length > 1) first.playlist = playlist;
							if (first.url) {
								Lampa.Player.play(first);
								Lampa.Player.playlist(playlist);
								item.mark();
								_this4.updateBalanser(balanser);
							} else {
								Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
							}
						} else Lampa.Noty.show(json && json.vip ? json.vip.title + '<br>' + json.vip.msg : Lampa.Lang.translate('modss_nolink'));
					}, true);
				},
				onContextMenu: function onContextMenu(item, html, data, call) {
					_this4.getFileUrl(item, function(stream) {
						call({
							file: stream,
							quality: item.qualitys
						});
					}, true);
				}
			});
			this.filter({
				season: filter_find.season.map(function(s) {
					return s;
				}),
				voice: filter_find.voice.map(function(b) {
					return b.title || b;
				}),
				order: (object.movie.number_of_seasons ? this.order.map(function(b) {
					return b.title;
				}) : ''),
				type: (filter_find.type.length ? filter_find.type.map(function(b) {
					return b;
				}) : ''),
				server: (filter_find.server.length ? filter_find.server.map(function(b) {
					return b;
				}) : ''),
			}, this.getChoice());
		};
		this.parse = function(json) {
			try {
				if (json.folder || json.similars || json.episode) extract = json;
				var find_s, find_v, voice;
				var choice = this.getChoice(balanser);
				var select_voice = choice.voice;
				var select_season = choice.season;
				var items = extract.folder || extract.episode;

				if (extract.similars) {
					this.activity.loader(false);
					this.similars(extract.results);
				} else if (json.vip) return this.noConnectToServer(json);
				else if (!items || !Lampa.Arrays.getKeys(items).length) return this.doesNotAnswer(object.search);
				else {
					if (extract && extract.season.length) filter_find.season = extract.season;
					if (extract && extract.server) filter_find.server = extract.server;
					if (extract && extract.type) filter_find.type = extract.type;
					if (typeof extract.season == 'object') filter_find.season = extract.season.map(function(s) {
						return s.name || s.title || s;
					});

					filter_find.season = filter_find.season.sort(function(a, b) {
						return (a.title || a).split(' ').pop() - (b.title || b).split(' ').pop();
					});

					var season = filter_find.season[select_season];
					if (!season) season = filter_find.season[0];

					if ((Lampa.Arrays.getKeys(items)[1] && isNaN(Lampa.Arrays.getKeys(items)[1]) || isNaN(Lampa.Arrays.getKeys(items)[0])) && extract.voice) {
						filter_find.voice = [];
						extract.voice.forEach(function(voic, keyt) {
							var s = items[voic][season.split(' ').pop()];
							if (!s) s = items[voic][Lampa.Arrays.getKeys(items[voic])[0]];
							if (items[voic] && s) {
								if (filter_find.voice.indexOf(voic) == -1) {
									filter_find.voice.push(voic);
								}
							}
						});
					}

					if (extract.voice && typeof extract.voice[0] == 'object') filter_find.voice = extract.voice;
					if (season) {
						voice = (filter_find.voice[select_voice] && (filter_find.voice[select_voice].name || filter_find.voice[select_voice].title)) || filter_find.voice[select_voice];

						find_s = extract.season.find(function(s) {
							return (s.name || s.title) == season;
						});

						find_v = (extract.voice && extract.voice || filter_find.voice).find(function(v) {
							return (v.name || v.title) == voice;
						});
						if (!voice && filter_find.voice.length) {
							voice = filter_find.voice[0] && (filter_find.voice[0].name || filter_find.voice[0].title) || find_v;
							choice.voice = filter_find.voice[voice];
						}
					}
					choice.seasons = filter_find.season.length;
					this.replaceChoice(choice);

					if (season && voice) {
						if ((Lampa.Arrays.getKeys(items)[1] ? !isNaN(Lampa.Arrays.getKeys(items)[1]) : !isNaN(Lampa.Arrays.getKeys(items)[0]))) {
							var s = season.split(' ')[1];
							items = items[s].filter(function(itm) {
								itm.info = voice;
								return itm.voice_id == find_v.id && itm.season == s;
							});
						} else {
							var find = items[voice][season.split(' ')[1]];
							if (!find && !extract.season[0].url) {
								filter_find.season = [];
								Lampa.Arrays.getKeys(items[voice]).forEach(function(s) {
									filter_find.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + s);
								});
							}
							if (!find && find_s && find_s.url) {
								this.request(this.requestParams(find_s.url));
							} else {
								var other = items[voice][Lampa.Arrays.getKeys(items[voice])[0]];
								items = find ? find : other;
							}
						}
					} else if (season && !voice) {
						items = items[(season.title || season).split(' ')[1]];
					}

					if (find_v && find_v.url && filter_find.season.length && Lampa.Arrays.getKeys(filter_find.voice).length && Lampa.Arrays.getKeys(extract.folder).length && !items.length) {
						this.activity.loader(true);
						this.request(this.requestParams(find_v.url));
					} else if (find_s && find_s.url && filter_find.season.length && Lampa.Arrays.getKeys(extract.folder).length && !items) {
						this.activity.loader(true);
						this.request(this.requestParams(find_s.url));
					} else if (items && items.length) {
						this.display(!choice.order ? items : items.reverse());
					} else if (!Lampa.Arrays.getKeys(items).length) this.empty();
				}
			} catch (e) {
				console.log('modss', 'error', e);
				this.doesNotAnswer();
				this.activity.loader(false);
			}
		};
		this.equalTitle = function(t1, t2) {
			return typeof t1 === 'string' && typeof t2 === 'string' && t1.toLowerCase().trim() === t2.toLowerCase().trim();
		};
		this.parsePlaylist = function(str) {
			var pl = [];
			try {
				if (str.charAt(0) === '[') {
					str.substring(1).split(',[').forEach(function(item) {
						if (item.endsWith(',')) item = item.substring(0, item.length - 1);
						var label_end = item.indexOf(']');
						if (label_end >= 0) {
							var label = item.substring(0, label_end);
							if (item.charAt(label_end + 1) === '{') {
								item.substring(label_end + 2).split(';{').forEach(function(voice_item) {
									if (voice_item.endsWith(';')) voice_item = voice_item.substring(0, voice_item.length - 1);
									var voice_end = voice_item.indexOf('}');
									if (voice_end >= 0) {
										var voice = voice_item.substring(0, voice_end);
										pl.push({
											label: label,
											voice: voice,
											links: voice_item.substring(voice_end + 1).split(' or ')
										});
									}
								});
							} else {
								pl.push({
									label: label,
									links: item.substring(label_end + 1).split(' or ')
								});
							}
						}
						return null;
					});
				}
			} catch (e) {}
			return pl;
		};
		this.parseM3U = function(str) {
			var pl = [];

			try {
				var width = 0;
				var height = 0;
				str.split('\n').forEach(function(line) {
					if (line.charAt(0) == '#') {
						var resolution = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);

						if (resolution) {
							width = parseInt(resolution[1]);
							height = parseInt(resolution[2]);
						}
					} else if (line.trim().length) {
						pl.push({
							width: width,
							height: height,
							link: line
						});
						width = 0;
						height = 0;
					}
				});
			} catch (e) {}

			return pl;
		};
		this.proxyCall = function(method, url, timeout, post_data, call_success, call_fail) {
			var process = function process() {
				if (proxyWindow) {
					timeout = timeout || 60 * 1000;
					var message_id;

					try {
						message_id = crypto.getRandomValues(new Uint8Array(16)).toString();
					} catch (e) {}

					if (!message_id) message_id = Math.random().toString();
					proxyCalls[message_id] = {
						success: call_success,
						fail: call_fail
					};
					proxyWindow.postMessage({
						message: 'proxyMessage',
						message_id: message_id,
						method: method,
						url: url,
						timeout: timeout,
						post_data: post_data
					}, '*');
					setTimeout(function() {
						var call = proxyCalls[message_id];

						if (call) {
							delete proxyCalls[message_id];
							if (call.fail) call.fail({
								status: 0,
								statusText: 'timeout',
								responseText: ''
							}, 'timeout');
						}
					}, timeout + 1000);
				} else {
					if (call_fail) call_fail({
						status: 0,
						statusText: 'abort',
						responseText: ''
					}, 'abort');
				}
			};

			if (!proxyInitialized) {
				proxyInitialized = true;
				var proxyOrigin = API.replace('api.', '').slice(0, -1);
				var proxyUrl = proxyOrigin + '/proxy.html';

				var proxyIframe = document.createElement('iframe');
				proxyIframe.setAttribute('src', proxyUrl);
				proxyIframe.setAttribute('width', '0');
				proxyIframe.setAttribute('height', '0');
				proxyIframe.setAttribute('tabindex', '-1');
				proxyIframe.setAttribute('title', 'empty');
				proxyIframe.setAttribute('style', 'display:none');
				proxyIframe.addEventListener('load', function() {
					proxyWindow = proxyIframe.contentWindow;
					window.addEventListener('message', function(event) {
						var data = event.data;

						if (event.origin === proxyOrigin && data && data.message === 'proxyResponse' && data.message_id) {
							var call = proxyCalls[data.message_id];

							if (call) {
								delete proxyCalls[data.message_id];

								if (data.status === 200) {
									if (call.success) call.success(data.responseText);
								} else {
									if (call.fail) call.fail({
										status: data.status,
										statusText: data.statusText,
										responseText: data.responseText
									});
								}
							}
						}
					});
					if (process) process();
					process = null;
				});
				document.body.appendChild(proxyIframe);
				setTimeout(function() {
					if (process) process();
					process = null;
				}, 10000);
			} else {
				process();
			}
		};
		this.similars = function(json) {
			var _this5 = this;
			json.forEach(function(elem) {
				var info = [];
				var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
				var orig = elem.orig_title || elem.nameEn || '';
				var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
				var transl = elem.translations ? String(elem.translations).split(',').slice(0, 2) : '';
				var count_s = elem.seasons_count ? elem.seasons_count + ' ' + Lampa.Lang.translate('torrent_serial_season').toLowerCase() + _this5.num_word(elem.seasons_count, ['', 'а', 'ов']) : '';
				var count_eps = elem.episodes_count ? elem.episodes_count + ' эпизод' + _this5.num_word(elem.episodes_count, ['', 'а', 'ов']) : '';
				if (year) info.push(year);
				if (orig && orig !== name) info.push(orig);
				if (elem.type) info.push(elem.type == 'tv-series' || elem.type == 'serial' || elem.type == 'MINI_SERIES' ? 'Cериал' : elem.type == 'TV_SHOW' ? 'Тв-Шоу' : elem.type == ('movie' || 'film' || 'FILM') ? 'Фильм' : elem.type);
				if (count_s) info.push((count_s && ' - ' + count_s + ' из них ' + count_eps));
				if (!count_s && count_eps) info.push(count_eps);
				if (transl) info.push(transl);
				if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('modss_online_rate', {
					rate: elem.rating
				}, true));
				if (elem.quality && elem.quality.length) info.push(elem.quality);

				if (elem.countries && elem.countries.length) {
					info.push((elem.filmId ? elem.countries.map(function(c) {
						return c.country;
					}) : elem.countries.map(function(c) {
						return c.title || c;
					})).join(', '));
				}

				if (elem.categories && elem.categories.length) {
					//  info.push(elem.categories.slice(0, 4).join(', '));
				}

				elem.title = name;
				elem.time = elem.filmLength || '';
				elem.info = info.join('<span class="online_modss-split">●</span>');
				var item = Lampa.Template.get('modss_online_folder', elem);
				item.on('hover:enter', function() {
					_this5.activity.loader(true);
					_this5.reset();
					_this5.request(elem.url);
				}).on('hover:focus', function(e) {
					last = e.target;
					scroll.update($(e.target), true);
				});
				scroll.append(item);
			});
			Lampa.Controller.enable('content');
		};
		this.getChoice = function(for_balanser) {
			var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
			var save = data[object.movie.id] || {};
			Lampa.Arrays.extend(save, {
				season: 0,
				voice: 0,
				order: 0,
				server: Lampa.Storage.get('pub_server', 1),
				type: Lampa.Storage.get('pub_type_striming', 3),
				voice_name: '',
				voice_id: 0,
				episodes_view: {},
				movie_view: '',
				seasons: ''
			});
			return save;
		};
		this.saveChoice = function(choice, for_balanser) {
			var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
			data[object.movie.id] = choice;
			Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
		};
		this.replaceChoice = function(choice, for_balanser) {
			var to = this.getChoice(for_balanser);
			Lampa.Arrays.extend(to, choice, true);
			this.saveChoice(to, for_balanser);
		};
		this.clearImages = function() {
			images.forEach(function(img) {
				img.onerror = function() {};
				img.onload = function() {};
				img.src = '';
			});
			images = [];
		};
		this.reset = function() {
			last = false;
			clearInterval(balanser_timer);
			network.clear();
			this.clearImages();
			scroll.render().find('.empty').remove();
			scroll.clear();
			scroll.reset();
		};
		this.loading = function(status) {
			if (status) this.activity.loader(true);
			else {
				this.activity.loader(false);
				this.activity.toggle();
			}
		};
		this.filter = function(filter_items, choice) {
			var _this6 = this;
			var select = [];
			var add = function add(type, title) {
				var need = _this6.getChoice();
				var items = filter_items[type];
				var subitems = [];
				var value = need[type];
				items.forEach(function(name, i) {
					subitems.push({
						title: name,
						selected: value == i,
						index: i
					});
				});
				select.push({
					title: title,
					subtitle: items[value],
					items: subitems,
					stype: type
				});
			};
			filter_items.source = filter_sources;
			select.push({
				title: Lampa.Lang.translate('torrent_parser_reset'),
				reset: true
			}, {
				title: Lampa.Lang.translate('modss_balanser'),
				subtitle: sources[balanser].name,
				bal: true
			});
			this.saveChoice(choice);
			if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
			if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
			if (!Lampa.Storage.get('pro_pub', false) && filter_items.type && filter_items.type.length) add('type', Lampa.Lang.translate('filter_video_stream') + '');
			if (!Lampa.Storage.get('pro_pub', false) && filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('filter_video_server') + '');
			if (filter_items.order && filter_items.order.length) add('order', Lampa.Lang.translate('filter_series_order') + '');

			filter.set('filter', select);
			filter.set('sort', filter_sources.map(function(e) {
				return {
					title: sources[e].name,
					source: e,
					selected: e == balanser,
					ghost: sources[e].vip
				};
			}).sort(function(a, b) {
				return a.ghost - b.ghost;
			}));
			this.selected(filter_items);
		};
		this.selected = function(filter_items) {
			var need = this.getChoice(),
				select = [];
			for (var i in need) {
				if (filter_items[i] && filter_items[i].length) {
					if (i == 'voice') {
						select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
					} else if (i !== 'source') {
						if (filter_items.season.length >= 1) {
							select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
						}
					}
				}
			}
			filter.chosen('filter', select);
			filter.chosen('sort', [sources[balanser].name.split(' ')[0]]);
		};
		this.getEpisodes = function(season, call) {
			var episodes = [];
			if (typeof object.movie.id == 'number' && object.movie.name) {
				var tmdburl = 'tv/' + object.movie.id + '/season/' + season + '?api_key=4ef0d7355d9ffb5151e987764708ce96&language=' + Lampa.Storage.get('language', 'ru');
				var baseurl = Lampa.TMDB.api(tmdburl);
				if (object.movie.source == 'pub') baseurl = Pub.baseurl + 'v1/items/' + object.movie.id + '?access_token=' + Pub.token;
				network.timeout(1000 * 10);
				network["native"](baseurl, function(data) {
					if (object.movie.source == 'pub') {
						episodes = data.item.seasons.find(function(s) {
							return s.number == season;
						});
						episodes = episodes && episodes.episodes || [];
					} else episodes = data.episodes || [];
					call(episodes);
				}, function(a, c) {
					call(episodes);
				});
			} else call(episodes);
		};
		this.draw = function(items) {
			var _this4 = this;
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var choice = _this4.getChoice();
			if (!items.length) return this.empty();
			scroll.append(Lampa.Template.get('modss_online_watched', {}));
			this.updateWatched();
			this.getEpisodes((object.movie.source == 'pub' || balanser == 'pub') || (object.movie.original_language !== 'ja' || object.movie.number_of_seasons >= choice.seasons) ? items[0].season : 1, function(episodes) {
				var viewed = Lampa.Storage.cache('online_view', 5000, []);
				var serial = object.movie.name ? true : false;
				var fully = window.innerWidth > 480;
				var scroll_to_element = false;
				var scroll_to_mark = false;

				var more = object.movie.original_language == 'ja' && episodes.length > items.length && (object.movie.number_of_seasons < choice.seasons);
				var ismore = true;
				if (more) {
					var ep = more ? episodes.slice(items.length) : episodes;
					ismore = items[items.length - 1].episode >= episodes[ep.length].episode_number;
					if (ismore) ep = episodes.slice(items.length - ((episodes.length - items.length) < items.length - 1 ? 2 : 1));
				}

				items.forEach(function(element, index) {
					var episodee = serial && episodes.length && !params.similars ? ((ismore && more) ? ep : episodes).find(function(e, i) {
						return (ismore && more) ? index == i : ((e.episode_number || e.number) == element.episode);
					}) : false;
					var episode = serial && episodes.length && !params.similars ? episodes.find(function(e, i) {
						return (e.episode_number || e.number) == element.episode;
					}) : false;

					var episode_num = element.episode || index + 1;
					var episode_last = choice.episodes_view[element.season];
					Lampa.Arrays.extend(element, {
						serv: (element.serv ? element.serv : ''),
						info: '',
						quality: '',
						time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
					});

					if (element.sizeB) element.quality = Lampa.Utils.calcBitrate(element.sizeB, episode ? episode.runtime : object.movie.runtime) + Lampa.Lang.translate('torrent_item_mb') + ' - ' + element.quality;

					var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
					var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.title + element.quality);
					var data = {
						hash_timeline: hash_timeline,
						hash_behold: hash_behold
					};
					var info = [];

					if (element.season) {
						element.translate_episode_end = _this4.getLastEpisode(items);
						element.translate_voice = element.voice_name;
					}

					element.timeline = Lampa.Timeline.view(hash_timeline);
					if (episode) {
						element.title = (element.episode_name || episode.name || episode.title || element.title);
						if (!element.info && episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
							rate: parseFloat(episode.vote_average + '').toFixed(1)
						}, true));
						if (episode.air_date && fully && !element.info.includes(Lampa.Utils.parseTime(episode.air_date).full)) info.push(Lampa.Utils.parseTime(episode.air_date).full);
					} else if (object.movie.release_date && object.movie.release_date.length > 4 && fully) {
						info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
					}

					if (!serial && object.movie.tagline && element.info.length < 30 && !element.info.includes(object.movie.tagline)) info.push(object.movie.tagline);
					if (element.info) info.push(element.info);
					if (element.voice_name && !element.info.includes(element.voice_name)) info.push(element.voice_name);
					if (info.length) element.info = info.map(function(i) {
						return '<span>' + i + '</span>';
					}).join('<span class="online_modss-split">●</span>');
					var html = Lampa.Template.get('modss_online_full', element);
					var loader = html.find('.online_modss__loader');
					var image = html.find('.online_modss__img');

					if (!serial) {
						if (choice.movie_view == hash_behold) scroll_to_element = html;
					} else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
						scroll_to_element = html;
						var cont = _this4.getChoice();
						if (Lampa.Storage.field('online_continued') && cont && cont.continued) {
							cont.continued = false;
							_this4.replaceChoice(cont, balanser);
							setTimeout(function() {
								$(html).trigger('hover:enter');
							}, 50);
						}
					}

					if (serial && episode_num || filter_find.season.length) image.append('<div class="online_modss__episode-number-season">S' + (element.season || episode && (episode.snumber || episode.season_number) || 0) + ':E' + (element.episode || episode && (episode.number || episode.episode_number) || 0) + '</div>');

					if (serial && !episode && filter_find.season.length) {
						image.append('<div class="online_modss__episode-number">' + ('0' + episode_num).slice(-2) + '</div>');
						loader.remove();
					} else {
						var img = html.find('img')[0];

						img.onerror = function() {
							img.src = './img/img_broken.svg';
						};

						img.onload = function() {
							image.addClass('online_modss__img--loaded');
							loader.remove();
						};
						img.src = object.movie.source == 'filmix' ? object.movie.img : object.movie.source == 'pub' ? (episode && episode.thumbnail || object.movie.background_image) : Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
						images.push(img);
					}

					html.find('.online_modss__timeline').append(Lampa.Timeline.render(element.timeline));
					if (Lampa.Timeline.details) {
						html.find('.online_modss__timeline').append(Lampa.Timeline.details(element.timeline));
					}

					if (element.subtitles) html.find('.online_modss__img').append('<div class="online_modss__subtitle">' + Lampa.Template.get('icon_subs', {}, true) + '</div>');

					if (viewed.indexOf(hash_behold) !== -1) {
						scroll_to_mark = html;
						html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
					}

					element.mark = function() {
						viewed = Lampa.Storage.cache('online_view', 5000, []);

						if (viewed.indexOf(hash_behold) == -1) {
							viewed.push(hash_behold);
							Lampa.Storage.set('online_view', viewed);

							if (html.find('.online_modss__viewed').length == 0) {
								html.find('.online_modss__img').append('<div class="online_modss__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
							}
						}

						choice = _this4.getChoice();

						if (!serial) {
							choice.movie_view = hash_behold;
						} else {
							choice.episodes_view[element.season] = episode_num;
						}

						_this4.saveChoice(choice);
						_this4.new_seria();

						_this4.watched({
							balanser: balanser,
							balanser_name: sources[balanser].name,
							voice_id: choice.voice_id,
							voice_name: choice.voice_name || element.voice_name || element.title,
							episode: element.episode,
							season: element.season
						});
					};
					element.unmark = function() {
						viewed = Lampa.Storage.cache('online_view', 5000, []);

						if (viewed.indexOf(hash_behold) !== -1) {
							Lampa.Arrays.remove(viewed, hash_behold);
							Lampa.Storage.set('online_view', viewed);
							if (Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
							html.find('.online_modss__viewed').remove();
							_this4.new_seria();
						}
					};
					element.timeclear = function() {
						element.timeline.percent = 0;
						element.timeline.time = 0;
						element.timeline.duration = 0;
						Lampa.Timeline.update(element.timeline);
						_this4.new_seria();
					};

					html.on('hover:enter', function() {
						if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
						if (params.onEnter) params.onEnter(element, html, data);
					}).on('hover:focus', function(e) {
						last = e.target;
						if (typeof element.voice == 'string' && element.voice) {
							$('.voices').remove();
							$('.explorer-card__descr').hide().after('<div class="voices"></div>');
							$('.voices').html(Lampa.Lang.translate('<b>#{torrent_parser_voice}:</b><br>' + element.voice));
						}
						if (params.onFocus) params.onFocus(element, html, data);
						scroll.update($(e.target), true);
					});
					if (params.onRender) params.onRender(element, html, data);

					_this4.contextMenu({
						html: html,
						element: element,
						onFile: function onFile(call) {
							if (params.onContextMenu) params.onContextMenu(element, html, data, call);
						},
						onClearAllMark: function onClearAllMark() {
							items.forEach(function(elem) {
								elem.unmark();
							});
						},
						onClearAllTime: function onClearAllTime() {
							items.forEach(function(elem) {
								elem.timeclear();
							});
						}
					});

					scroll.append(html);
				});

				if (serial && object.movie.number_of_seasons >= choice.seasons && episodes.length > items.length && !params.similars) {
					var left = episodes.slice(items.length);
					left.forEach(function(episode) {
						var info = [];
						if (episode.vote_average) info.push(Lampa.Template.get('modss_online_rate', {
							rate: parseFloat(episode.vote_average + '').toFixed(1)
						}, true));
						if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
						var air = new Date((episode.air_date + '').replace(/-/g, '/'));
						var now = Date.now();
						var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
						var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
						var html = Lampa.Template.get('modss_online_full', {
							serv: (episode.serv ? episode.serv : ''),
							time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
							info: info.length ? info.map(function(i) {
								return '<span>' + i + '</span>';
							}).join('<span class="online_modss-split">●</span>') : '',
							title: episode.name,
							quality: day > 0 ? txt : ''
						});

						var loader = html.find('.online_modss__loader');
						var image = html.find('.online_modss__img');
						var season = items[0] ? items[0].season : 1;
						html.find('.online_modss__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
						var img = html.find('img')[0];

						if (episode.still_path) {
							img.onerror = function() {
								img.src = './img/img_broken.svg';
							};

							img.onload = function() {
								image.addClass('online_modss__img--loaded');
								loader.remove();
								image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
							};

							img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
							images.push(img);
						} else {
							loader.remove();
							image.append('<div class="online_modss__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
						}

						html.on('hover:focus', function(e) {
							last = e.target;
							scroll.update($(e.target), true);
						});
						html.css('opacity', '0.3');
						scroll.append(html);
					});
				}

				if (scroll_to_element) {
					last = scroll_to_element[0];
				} else if (scroll_to_mark) {
					last = scroll_to_mark[0];
				}
				_this4.activity.loader(false);

				Lampa.Controller.enable('content');
			});
		};
		this.new_seria = function() {
			if (object.movie.number_of_seasons) {
				setTimeout(function() {
					$('.card--new_ser, .card--viewed, .full-start__right .time-line, .card--last_view').remove();
					if ($('body').find('.online').length !== 0) {
						if ($('body').find('.online:last-child .torrent-item__viewed').length == 1 || $('body').find('.online:last-child .time-line.hide').length == 0) $('body').find('.full-start__poster').append("<div class='card--viewed' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('online_viewed') + "</div>");
						else $('body').find('.full-start__poster').append("<div class='card--new_ser' style='right: -0.6em;position: absolute;background: #168FDF;color: #fff;top: 0.8em;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate('season_new') + " " + Lampa.Lang.translate('torrent_serial_episode') + "</div>");
					}
					//Modss.last_view(object.movie);
				}, 50);
			}
		};
		this.watched = function(set) {
			var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
			var watched = Lampa.Storage.cache('online_watched_last', 5000, {});

			if (set) {
				if (!watched[file_id]) watched[file_id] = {};
				Lampa.Arrays.extend(watched[file_id], set, true);
				Lampa.Storage.set('online_watched_last', watched);
				this.updateWatched();
			} else {
				return watched[file_id];
			}
		};
		this.updateWatched = function() {
			var watched = this.watched();
			var body = scroll.body().find('.online-modss-watched .online-modss-watched__body').empty();

			if (watched) {
				var line = [];
				if (watched.balanser_name) line.push(watched.balanser_name);
				if (watched.voice_name) line.push(watched.voice_name);
				if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
				if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
				line.forEach(function(n) {
					body.append('<span>' + n + '</span>');
				});
			} else body.append('<span>' + Lampa.Lang.translate('online_no_watch_history') + '</span>');
		};
		this.num_word = function(value, words) {
			value = Math.abs(value) % 100;
			var num = value % 10;
			if (value > 10 && value < 20) return words[2];
			if (num > 1 && num < 5) return words[1];
			if (num == 1) return words[0];
			return words[2];
		};
		this.order = [{
			title: 'Стандартно',
			id: 'normal'
		}, {
			title: 'Инвертировать',
			id: 'invers'
		}];
		this.contextMenu = function(params) {
			params.html.on('hover:long', function() {
				function show(extra) {
					var enabled = Lampa.Controller.enabled().name;
					var menu = [];
					if (Lampa.Platform.is('webos')) {
						menu.push({
							title: Lampa.Lang.translate('player_lauch') + ' - Webos',
							player: 'webos'
						});
					}
					if (Lampa.Platform.is('android')) {
						menu.push({
							title: Lampa.Lang.translate('player_lauch') + ' - Android',
							player: 'android'
						});
					}
					menu.push({
						title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
						player: 'lampa'
					});
					menu.push({
						title: Lampa.Lang.translate('speedtest_button'),
						speed: true
					});
					menu.push({
						title: Lampa.Lang.translate('modss_video'),
						separator: true
					});
					menu.push({
						title: Lampa.Lang.translate('torrent_parser_label_title'),
						mark: true
					});
					menu.push({
						title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
						unmark: true
					});
					menu.push({
						title: Lampa.Lang.translate('time_reset'),
						timeclear: true
					});
					if (extra) {
						menu.push({
							title: Lampa.Lang.translate('copy_link'),
							copylink: true
						});
					}
					menu.push({
						title: Lampa.Lang.translate('more'),
						separator: true
					});
					if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
						menu.push({
							title: Lampa.Lang.translate('modss_voice_subscribe'),
							subscribe: true
						});
					}
					menu.push({
						title: Lampa.Lang.translate('modss_clear_all_marks'),
						clearallmark: true
					});
					menu.push({
						title: Lampa.Lang.translate('modss_clear_all_timecodes'),
						timeclearall: true
					});
					Lampa.Select.show({
						title: Lampa.Lang.translate('title_action'),
						items: menu,
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						},
						onSelect: function onSelect(a) {
							if (a.mark) params.element.mark();
							if (a.unmark) params.element.unmark();
							if (a.timeclear) params.element.timeclear();
							if (a.clearallmark) params.onClearAllMark();
							if (a.timeclearall) params.onClearAllTime();
							Lampa.Controller.toggle(enabled);
							if (a.player) {
								Lampa.Player.runas(a.player);
								params.html.trigger('hover:enter');
							}
							if (a.speed) {
								Modss.speedTest(extra.file.url || extra.file, {
									title: object.search,
									info: [params.element.title, params.element.quality].join(' - '),
									balanser: (['pub', 'hdr'].indexOf(balanser) >= 0 && ((params.element.serv && params.element.serv || '') + (params.element.info && params.element.info.split('●').pop() + ' - ' || '')) || '') + sources[balanser].name
								});
							}
							if (a.copylink) {
								if (extra.quality) {
									var qual = [];
									for (var i in extra.quality) {
										qual.push({
											title: i,
											file: extra.quality[i]
										});
									}
									Lampa.Select.show({
										title: Lampa.Lang.translate('settings_server_links'),
										items: qual,
										onBack: function onBack() {
											Lampa.Controller.toggle(enabled);
										},
										onSelect: function onSelect(b) {
											Lampa.Utils.copyTextToClipboard(b.file, function() {
												Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
											}, function() {
												Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
											});
										}
									});
								} else {
									Lampa.Utils.copyTextToClipboard(extra.file.url, function() {
										Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
									}, function() {
										Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
									});
								}
							}
							if (a.subscribe) {
								Lampa.Account.subscribeToTranslation({
									card: object.movie,
									season: params.element.season,
									episode: params.element.translate_episode_end,
									voice: params.element.translate_voice
								}, function() {
									Lampa.Noty.show(Lampa.Lang.translate('modss_voice_success'));
								}, function() {
									Lampa.Noty.show(Lampa.Lang.translate('modss_voice_error'));
								});
							}
						}
					});
				}
				params.onFile(show);
			}).on('hover:focus', function() {
				if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
			});
		};
		this.empty = function(msg) {
			var html = Lampa.Template.get('modss_does_not_answer', {});
			html.find('.online-empty__buttons').remove();
			html.find('.online-empty__title').text(msg && msg.title ? msg.title : Lampa.Lang.translate('empty_title_two'));
			html.find('.online-empty__time').text(msg && msg.mes ? msg.mes : msg ? msg : Lampa.Lang.translate('empty_text'));
			scroll.append(html);
			this.loading(false);
			var balanser = files.render().find('.filter--sort');
			Navigator.focus(balanser[0]);
		};
		this.noConnectToServer = function(er) {
			var html = Lampa.Template.get('modss_does_not_answer', {});
			html.find('.online-empty__buttons').remove();
			html.find('.online-empty__title').text(er && er.vip ? er.vip.title : Lampa.Lang.translate('title_error'));
			html.find('.online-empty__time').text(er && er.vip ? er.vip.msg : er ? er : Lampa.Lang.translate('modss_does_not_answer_text'));
			files.appendHead(html);
			this.loading(false);
			var balanser = files.render().find('.filter--sort');
			Navigator.focus(balanser[0]);
		};
		this.doesNotAnswer = function(query) {
			var _this8 = this;
			this.reset();
			var html = Lampa.Template.get('modss_does_not_answer', {
				title: (query && query.length) ? (Lampa.Lang.translate('online_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_query_end') + Lampa.Lang.translate('modss_balanser_dont_work_from')) : Lampa.Lang.translate('modss_balanser_dont_work'),
				balanser: balanser
			});
			var tic = 10;
			html.find('.cancel').on('hover:enter', function() {
				clearInterval(balanser_timer);
			});
			html.find('.change').on('hover:enter', function() {
				clearInterval(balanser_timer);
				filter.render().find('.filter--sort').trigger('hover:enter');
			});
			scroll.append(html);
			this.loading(false);
			Lampa.Controller.enable('content');
			balanser_timer = setInterval(function() {
				tic--;
				html.find('.timeout').text(tic);
				if (tic == 0) {
					clearInterval(balanser_timer);
					var keys = Lampa.Arrays.getKeys(sources);
					var indx = keys.indexOf(balanser);
					var next = keys[indx + 1];
					if (!next) next = keys[0];
					balanser = next;
					if (Lampa.Activity.active().activity == _this8.activity) _this8.changeBalanser(balanser);
				}
			}, 1000);
		};
		this.getLastEpisode = function(items) {
			var last_episode = 0;
			items.forEach(function(e) {
				if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
			});
			return last_episode;
		};
		this.start = function() {
			if (Lampa.Activity.active().activity !== this.activity) return;
			if (!initialized) {
				initialized = true;
				this.initialize();
			}
			Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render(), files.render());
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				gone: function gone() {
					clearTimeout(balanser_timer);
				},
				up: function up() {
					if (Navigator.canmove('up')) {
						Navigator.move('up');
					} else Lampa.Controller.toggle('head');
				},
				down: function down() {
					Navigator.move('down');
				},
				right: function right() {
					if (Navigator.canmove('right')) Navigator.move('right');
					else if (object.movie.number_of_seasons) filter.show(Lampa.Lang.translate('title_filter'), 'filter');
					else filter.show(Lampa.Lang.translate('modss_balanser'), 'sort');
				},
				left: function left() {
					var poster = files.render().find('.explorer-card__head-img');
					if (poster.hasClass('focus')) Lampa.Controller.toggle('menu');
					else if (Navigator.canmove('left')) Navigator.move('left');
					else Navigator.focus(poster[0]);
				},
				back: this.back.bind(this)
			});
			Lampa.Controller.toggle('content');
		};
		this.render = function() {
			return files.render();
		};
		this.back = function() {
			if (back_url) {
				this.activity.loader(true);
				this.reset();
				this.request(back_url);
				back_url = false;
			} else Lampa.Activity.backward();
		};
		this.pause = function() {};
		this.stop = function() {};
		this.destroy = function() {
			network.clear();
			this.clearImages();
			files.destroy();
			scroll.destroy();
			clearInterval(balanser_timer);
			clearTimeout(life_wait_timer);
		};
	}

	function forktv(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true,
			step: 250
		});
		var items = [];
		var contextmenu_all = [];
		var html = $('<div class="forktv"></div>');
		var body = $('<div class="category-full"></div>');
		var last;
		var waitload = false;
		var active = 0;
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			if (object.submenu) _this.build(object.url);
			else {
				var u = object.url && object.url.indexOf('?') > -1 ? '&' : '?';
				network["native"](object.url + u + ForkTV.user_dev(), function(found) {
					_this.build(found);
				}, function(a, c) {
					_this.build(a);
					Lampa.Noty.show(network.errorDecode(a, c));
				});
			}
			return this.render();
		};
		this.next = function(next_page_url) {
			var _this2 = this;
			if (waitload) return;
			if (object.page < 90) {
				waitload = true;
				object.page++;
				network["native"](next_page_url + '&' + ForkTV.user_dev(), function(result) {
					_this2.append(result);
					if (result.channels.length) waitload = false;
					Lampa.Controller.enable('content');
					_this2.activity.loader(false);
				}, function(a, c) {
					Lampa.Noty.show(network.errorDecode(a, c));
				});
			}
		};
		this.stream = function(data, title, youtube, subs, element, view) {
			var _this = this;
			if (data.indexOf('getstream') == -1 && (data.indexOf('rgfoot') > -1 || data.indexOf('torrstream') > -1 || data.indexOf('torrent') > -1)) {
				this.activity.loader(true);
				network.timeout(10000);
				network["native"](data + '&' + ForkTV.user_dev(), function(json) {
					_this.activity.loader(false);
					if (json.channels.length > 0) {
						var playlist = [];
						var data = json.channels[0];
						if (data.stream_url) {
							var first = {
								title: data.title,
								url: data.stream_url,
								timeline: view
							};
							if (json.channels.length > 1) {
								json.channels.forEach(function(elem) {
									playlist.push({
										title: elem.title,
										url: elem.stream_url
									});
								});
							} else playlist.push(first);
							if (playlist.length > 1) first.playlist = playlist;
							Lampa.Player.play(first);
							Lampa.Player.playlist(playlist);
						} else Lampa.Noty.show(data.title);
					} else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
				}, function(a, e) {
					_this.activity.loader(false);
					Lampa.Noty.show(network.errorDecode(a, e));
				}, false, {
					dataType: 'json'
				});
			} else if (data && data.match(/magnet|videos|stream\?|mp4|mkv|m3u8/i)) {
				if (object.title == 'IPTV') {
					Lampa.Activity.push({
						url: data + '?' + ForkTV.user_dev(),
						title: "🎃 HackMods 🏷️ TV",
						component: 'modss_tv',
						page: 1
					});
				} else {
					var subtitles = [];
					if (subs) {
						subs.forEach(function(e) {
							subtitles.push({
								label: e[0],
								url: e[1]
							});
						});
					}
					var playlist = [];
					var first = {
						title: title,
						url: data,
						subtitles: subtitles,
						timeline: view
					};
					if (element.length > 1) {
						JSON.parse(element).forEach(function(elem) {
							if (elem.title.match('Описание|Торрент|Трейлер|Страны|Жанр|Похож|Модел|Студи|Катег|Превь|Тег|Порноз') == null) playlist.push({
								title: elem.title,
								url: elem.stream_url
							});
						});
					} else playlist.push(first);
					if (playlist.length > 1) first.playlist = playlist;
					Lampa.Player.play(first);
					Lampa.Player.playlist(playlist);
				}
			} else if (youtube) {
				var id = youtube.split('=')[1];
				if (Lampa.Platform.is('android')) Lampa.Android.openYoutube(id);
				else _this.YouTube(id);
			}
		};
		this.append = function(data) {
			var _this3 = this;
			var viewed = Lampa.Storage.cache('online_view', 5000, []);
			var bg_img = JSON.stringify(data).replace('background-image', 'background_image');
			bg_img = JSON.parse(bg_img);
			bg_img.background_image && Lampa.Background.immediately(bg_img.background_image);
			if (data.channels && data.channels.length == 0) {
				Lampa.Noty.show('Ничего не найдено');
			} else {
				var json = data.channels && data.menu && data.menu.length > 0 && data.menu[0].title != 'Трейлер' && data.next_page_url && data.next_page_url.indexOf('page=1') > -1 ? data.menu.concat(data.channels) : (object.title == 'SerialHD' && data.next_page_url && data.next_page_url.split('page=')[1] != 2) ? data.channels.slice(1) : data.channels;
				json = JSON.stringify(json).replace('<br \/>', '<br>').replace(/\)|\(|%20/g, '');
				if (data.title == 'HDGO') {
					[{
						name: 'Быстрый доступ',
						id: [0, 1, 2, 3]
					}, {
						name: 'Фильмы',
						id: [4, 14, 15, 16, 17]
					}, {
						name: 'Сериалы',
						id: [5, 18, 19, 20, 21, 22]
					}, {
						name: 'Мультфильмы',
						id: [6, 23, 24, 25]
					}, {
						name: 'Мультсериалы',
						id: [7, 26, 27, 28, 29]
					}, {
						name: 'Аниме',
						id: [8, 30, 31, 32, 33]
					}, {
						name: 'Тв-Шоу',
						id: [9, 34, 35, 36]
					}, {
						name: 'Док. Сериалы',
						id: [10, 37, 38, 39]
					}, {
						name: 'Док. Фильмы',
						id: [11, 40, 41]
					}].map(function(i) {
						_this3.appendHdgo({
							title: i.name,
							results: JSON.parse(json).filter(function(element, id) {
								if (i.id.indexOf(id) > -1) return element;
							})
						});
					});
				} else {
					var element = JSON.parse(json)[0];
					var infos = element.description ? element.description : element.template;
					var voic = infos && infos.match(/Озвучка:(.*?)<br/) || infos && infos.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
					if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
						var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
						object.movie = {
							img: image,
							title: object.title,
							original_title: '',
							id: 1
						};
						var files = new Lampa.Files(object);
						files.append(scroll.render());
						html.append(files.render());
						html.find('.selector').unbind('hover:enter').on('hover:enter', function() {
							if (element.description || element.template) Lampa.Modal.open({
								title: element.title,
								size: 'medium',
								html: $(element.description ? $(element.description).attr('style', '') : element.template),
								onBack: function onBack() {
									Lampa.Modal.close();
									Lampa.Controller.toggle('content');
								}
							});
						});
					}
					JSON.parse(json).forEach(function(element) {
						var stream = element.stream_url ? element.stream_url : element.playlist_url;
						if (element.title.match('Описание|Трейлер') == null) {
							if (element.template && element.template.indexOf('film.') > -1 || element.logo_30x30 && element.logo_30x30.match('mediafil') || element.logo_30x30 && element.logo_30x30.match('folder') && element.playlist_url && element.playlist_url.indexOf('torrstream?magnet') > -1) {
								body.attr('class', '');
								scroll.body().addClass('torrent-list');
								element.quality = (voic && voic[0]) || '';
								element.info = '';
								if (element.logo_30x30 && element.logo_30x30.match(/folder|mediafil/) && stream && stream.match(/torrstream\?magnet|getstream|kinomix/)) {
									var des = $(element.template || element.description).text();
									var vo = des.match(/Озвучка(.*?)Вид/) || des.match(/Перевод:(.*?)Разм/);
									var vid = des.match(/Видео[:](.*?)[|]/) || des.match(/Видео[:](.*?)Длит/) || des.match(/Видео(.*?)$/);
									var sed_per = des.match(/Раздают:(.*?)Качают:(.*?)(Обн|Кач|Длит)/) || des.match(/Раздают:(.*?)\s[|]\sКачают:(.*?)(Обн|Кач|Длит)/);
									var size1 = des.match(/t\/s(.*?)Озв/) || des.match(/Размер:(.*?)Разд/) || $(element.template || element.description).find('.trt-size').text();
									var sizes = size1 && size1[1] || $(element.template || element.description).find('.trt-size').text();
									element.quality = '';
									if (sed_per || vid || sizes || vo) element.info = (sed_per ? '<b style="color:green">&#8679;' + parseInt(sed_per[1]) + '</b><b style="color:red">&#8659;' + parseInt(sed_per[2]) + '</b> - ' : '') + (vo ? vo[1] + ' / ' : '') + (sizes && ' <b>' + sizes + '</b><br><hr>' || '') + (vid ? vid[0].replace(/Аудио|Звук/, ' | Аудио') : '');
								}
								var card = Lampa.Template.get('onlines_v1', element);
								var hash = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
								var view = Lampa.Timeline.view(hash);
								var hash_file = Lampa.Utils.hash([element.title, element.ident, stream].join(''));
								element.timeline = view;
								card.append(Lampa.Timeline.render(view));
								if (Lampa.Timeline.details) card.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
								if (viewed.indexOf(hash_file) !== -1) card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
							} else {
								var image = element.before && element.before.indexOf('src') > -1 ? $('img', element.before).attr('src') : element.template && element.template.indexOf('src') > -1 ? $('img', element.template).attr('src') : element.description && element.description.indexOf('src') > -1 ? $('img', element.description).attr('src') : element.logo_30x30 && element.logo_30x30.indexOf('png') > -1 ? element.logo_30x30 : element.details && element.details.poster ? element.details.poster : './img/icons/film.svg';
								if (!element.search_on) {
									var time = $($(element.description).children()[0]).parent().text();
									time = time.match(/Продолжительность: (.*?)?./i);
									time = time && time.shift() + ' - ' || '';
									var descr = !element.ident && element.description && $($(element.description).children()[1]) ? $($(element.description).children()[1]).text().slice(0, 130) || $($(element.description).children()[0]).parent().text().slice(0, 130) : '';
									var info = element.description ? element.description : element.template;
									var voice = info && info.match(/Озвучка[:](.*?)(Субтит|<\/div><\/div>|<br)/) || info && info.match(/Перевод:(.*?)(<br|Разм|Обн|Реж|Вр|Фор)/) || '';
									var size = info && info.match(/(Размер|Size):(.*?)<br/) || '';
									var qual = info && info.match(/Качество:(.*?)<br/) || '';
									var qual2 = qual ? qual[1].split(' ')[1] : voice ? voice[1] && voice[1].split('>')[2].trim().split(/,\s|\s/)[0] : '';
									var rating = $(element.template).find('.a-r').text();
									var peer = info && info.split(/<br[^>]*>|<\/div>/).find(function(itm) {
										if (itm.match(/Качают|Скачивают|Leechers/)) return itm;
									});
									var seed = info && info.split(/<br[^>]*>|<\/div>/).find(function(itm) {
										if (itm.match('Раздают|Seeders')) return itm;
									});
								}
								var card = Lampa.Template.get('card', {
									title: element.title || element.details && element.details.name,
									release_year: (size && size[0] + ' | ') + voice && voice[1] ? (voice[1].indexOf(',') > -1 ? voice[1].split(',')[0] : voice[1]) : ''
								});
								if (rating) card.find('.card__view').append('<div class="card__type a-r' + (rating <= 5 ? ' b' : (rating >= 5 && rating <= 7) ? ' de' : ' g') + '" style="background-color: #ff9455;">' + rating + '</div>');
								if (qual2) card.find('.card__view').append('<div class="card__quality">' + qual2 + '</div>');
								if (seed) card.find('.card__view').append('<div class="card__type" style="background:none;font-size:1em;left:-.2em;top:-.5em"><b style="position:relative ;background: green;color: #fff;" class="card__type">' + parseInt(seed.match(/ \d+/) ? seed.match(/ \d+/)[0] : seed.match(/\d+/)[0]) + '</b><b class="card__type" style="position:relative;background: #ff4242;color: #fff;left:-1em!important;border-bottom-left-radius: 0;border-top-left-radius: 0" class="info_peer">' + parseInt(peer.match(/ \d+/) ? peer.match(/ \d+/)[0] : peer.match(/\d+/)[0]) + '</b></div>');
								card.addClass(isNaN(element.ident) && (element.home || typeof element.details != 'undefined' || element.title == 'Все' || element.title.match(/Всі|Обновлен|жанры|сезон|Наше|Зарубеж|Женск|Муж|Отеч|Фил|Сериал|Мул|Худ/g) !== null || element.template && element.template.indexOf('svg') > -1 || element.logo_30x30 && element.logo_30x30.match(/ttv|right|succes|server|info|cloud|translate|error|trailer|uhd|webcam|mediafile|viewed|new|top|country|genre|similarmenu|filter/g) != null || stream && (stream.indexOf('browse') > -1 || stream.indexOf('viewforum') > -1 || stream.indexOf('me/list?actor=') > -1 || stream.indexOf('genre=') > -1) || element.playlist_url && element.playlist_url.indexOf('actor') == -1 && element.playlist_url && element.playlist_url.indexOf('voice?') == -1 && element.playlist_url && element.playlist_url.match(/cat=|page=|year=|list\?direc|genre|list\?actor|country/g) !== null || element.playlist_url && element.playlist_url.indexOf('view?id') == -1 && element.playlist_url && element.playlist_url.indexOf('stream?id') == -1 && element.playlist_url && element.playlist_url.indexOf('details?') == -1 && object.title.indexOf('HDGO') > -1 || element.logo_30x30 && element.logo_30x30.indexOf('webcam') > -1) ? 'card--collection' : 'card--category');
								if (!data.landscape && !data.details && ((/iPhone|android/i.test(navigator.userAgent) || Lampa.Platform.is('android')))) card.addClass('mobile');
								if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) card.addClass('pc');
								if (/Mozilla/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent) || Lampa.Platform.tv()) card.addClass('tv');
								if (data.details && !data.details.images && stream && stream.match(/subcategory|submenu|page=|year=|list\?direc|genre|list\?actor|country/g) !== null) card.addClass('mobiles');
								if (element.description && element.description.indexOf('linear-gradientto') > -1 || data.landscape || data.next_page_url && data.next_page_url.indexOf('girl') > -1) card.addClass('nuam');
								if (data.next_page_url && data.next_page_url.indexOf('girl') > -1 && stream.indexOf('vporn/list?cat')) card.addClass('card--category').removeClass('card--collection');
								if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter|mediafolder/g) != null) card.addClass('hdgo');
								if (element.logo_30x30 && element.logo_30x30.match(/\/folder\./g) && stream.match(/stream|magnet|view\?|view=|\/details/g)) card.addClass('mobile card--category').removeClass('card--collection');
								if (element.logo_30x30 && element.logo_30x30.indexOf('/folder.') > -1 && stream.match(/view=/g)) card.addClass('card--category hdgo').removeClass('card--collection nuam mobile');
								if (element.logo_30x30 && element.logo_30x30.match(/mediafolder/g)) card.addClass('card--category').removeClass('card--collection');
								if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && ((data.next_page_url && data.next_page_url.indexOf('girl') > -1) && stream.match(/pornst|models/g) !== null)) card.addClass('card--category').removeClass('nuam hdgo mobile card--collection');
								if (image && image.indexOf('film.svg') > -1) card.addClass('card--collection nuam');
								if (bg_img.background_image && bg_img.background_image.indexOf('18') > -1 && stream.match(/view\?|hdporn|channel=/g)) card.addClass('card--collection').removeClass('nuam hdgo mobile card--category');
								if (object.title.match(/Торренты|ForkTV|18\+/g)) card.addClass('home');
								if (element.logo_30x30 && element.logo_30x30.match(/country|genre|filter/g)) card.addClass('sort');
								if ((stream && stream.match(/filmix\?subcategory|rutor/) || element.submenu && element.submenu[0] && element.submenu[0].playlist_url && element.submenu[0].playlist_url.indexOf('rutor') > -1) && element.logo_30x30 && element.logo_30x30.match(/filter/g)) card.addClass('two');
								if (element.title == 'Поиск' && (stream && stream.match(/coldfilm/) || object.title == 'SerialHD')) card.addClass('searc');
								var img = card.find('img')[0];
								img.onload = function() {
									card.addClass('card--loaded');
								};
								img.onerror = function(e) {
									img.src = './img/img_broken.svg';
								};
								var picture = image && image.indexOf('yandex') > -1 ? 'https://cors.eu.org/' + image : image && image.indexOf('svg') > -1 ? image : image;
								img.src = image;
							}
							//console.log ('class', card[0].className, window.innerWidth)
							card.on('hover:focus hover:touch', function() {
								if (this.className.indexOf('card--category') > -1) {
									if (Lampa.Helper) Lampa.Helper.show('online_file', 'Удерживайте клавишу (ОК) для просмотра описания', card);
									//Lampa.Background.immediately(image);
								}
								last = card[0];
								scroll.update(card, true);
								var maxrow = Math.ceil(items.length / 7) - 1;
								if (Math.ceil(items.indexOf(card) / 7) >= maxrow) if (data.next_page_url) _this3.next(data.next_page_url);
							}).on('hover:enter', function() {
								if (stream || data.channels.length > 0) {
									if (element.event || (stream && stream.match(/youtube|stream\?|mp4|mkv|m3u8/i))) {
										_this3.stream(stream, element.title, element.infolink || element.stream_url, element.subtitles, json, view);
										if (viewed.indexOf(hash_file) == -1) {
											viewed.push(hash_file);
											card.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
											Lampa.Storage.set('online_view', viewed);
										}
									} else if (element.search_on) {
										Lampa.Input.edit({
											value: element.playlist_url.indexOf('newserv') > -1 && Lampa.Storage.get('server_ip') ? Lampa.Storage.get('server_ip') : '',
											free: true
										}, function(new_value) {
											if (new_value == '') {
												Lampa.Controller.toggle('content');
												return;
											}
											if (element.playlist_url.indexOf('newserv') > -1) Lampa.Storage.set('server_ip', new_value);
											var query = element.playlist_url.indexOf('newserv') > -1 ? Lampa.Storage.get('server_ip') : new_value;
											var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
											network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function(json) {
												if (json.channels && json.channels[0].title.indexOf('по запросу') > -1) {
													if (json.channels.length == 0) {
														Lampa.Controller.toggle('content');
														return;
													}
													Lampa.Modal.open({
														title: '',
														size: 'medium',
														html: Lampa.Template.get('error', {
															title: 'Ошибка',
															text: json.channels[0].title
														}),
														onBack: function onBack() {
															Lampa.Modal.close();
															Lampa.Controller.toggle('content');
														}
													});
												} else {
													Lampa.Activity.push({
														title: element.title,
														url: json,
														submenu: true,
														component: 'forktv',
														page: 1
													});
												}
											});
										});
									} else if (stream == '' || image.indexOf('info.png') > -1) {
										Lampa.Modal.open({
											title: element.title,
											size: 'medium',
											html: $('<div style="font-size:4vw">' + $(element.description)[0].innerHTML + '</div>'),
											onBack: function onBack() {
												Lampa.Modal.close();
												Lampa.Controller.toggle('content');
											}
										});
									} else if (stream) {
										var goto = function goto() {
											var title = /*stream == 'submenu' ? element.submenu && element.submenu[0].title : */
											element.details && element.details.title ? element.details.title : element.title && element.title.indexOf('l-count') > -1 ? element.title.split(' ').shift() : element.details && element.details.name ? element.details.name : element.title;
											//console.log (element.submenu)
											var url = stream == 'submenu' ? {
												channels: element.submenu
											} : stream;
											Lampa.Activity.push({
												title: title,
												url: url,
												submenu: stream == 'submenu',
												component: 'forktv',
												page: 1
											});
										};
										if (element.title == '18+' && Lampa.Storage.get('mods_password')) {
											Lampa.Input.edit({
												value: "",
												title: "Введите пароль доступа",
												free: true,
												nosave: true
											}, function(t) {
												if (Lampa.Storage.field('mods_password') == t) goto();
												else {
													Lampa.Noty.show('Неверный пароль.');
													Lampa.Controller.toggle('content');
												}
											});
										} else goto();
									} else if (element.description && element.description.indexOf('доступа') > -1) {
										ForkTV.checkAdd('content');
									}
								}
							}).on('hover:long', function() {
								if (stream && stream.match('bonga|chatur|rgfoot') == null && stream.match(/stream\?|mp4|mkv|m3u8/i)) {
									_this3.contextmenu({
										item: card,
										view: view,
										viewed: viewed,
										hash_file: hash_file,
										file: stream
									});
								}
								if ((element.template || element.description) && stream && stream.match('torrstream|getstream|mp4|kinomix') == null && stream.match(/viewtube|details|season|view\?|voice|magnet|stream\?id|mp4|m3u8/i) && (element.description || element.template)) {
									Lampa.Modal.open({
										title: element.title,
										size: 'medium',
										html: $(element.description ? $(element.description).attr('style', '') : element.template),
										onBack: function onBack() {
											Lampa.Modal.close();
											Lampa.Controller.toggle('content');
										}
									});
								}
							});
							body.append(card);
							items.push(card);
						}
					});
				}
			}
		};
		this.build = function(data) {
			if (data.channels && data.channels.length) {
				scroll.minus();
				html.append(scroll.render());
				this.append(data);
				scroll.append(body);
				this.activity.toggle();
			} else {
				this.activity.toggle();
				html.append(scroll.render());
				this.empty();
			}
			this.activity.loader(false);
		};
		this.createHdGO = function(data) {
			var content = Lampa.Template.get('items_line', {
				title: data.title
			});
			var body = content.find('.items-line__body');
			var scroll = new Lampa.Scroll({
				horizontal: true,
				step: 300
			});
			var items = [];
			var active = 0;
			var last;
			this.create = function() {
				scroll.render().find('.scroll__body').addClass('items-cards');
				content.find('.items-line__title').text(data.title);
				data.results.forEach(this.append.bind(this));
				body.append(scroll.render());
			};
			this.item = function(data) {
				var item = Lampa.Template.get('hdgo_item', {
					title: data.title
				});
				if (/iPhone|x11|nt|Mozilla/i.test(navigator.userAgent) || Lampa.Platform.tv()) item.addClass('card--collection').find('.card__age').remove();
				if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) item.addClass('hdgo pc');
				if (Lampa.Platform.tv()) item.addClass('hdgo tv');
				var logo = data.logo_30x30 ? data.logo_30x30 : data.template && data.template.indexOf('src') > -1 ? $('img', data.template).attr('src') : 'img/actor.svg';
				var img = item.find('img')[0];
				img.onerror = function() {
					img.src = './img/img_broken.svg';
				};
				img.src = logo;
				this.render = function() {
					return item;
				};
				this.destroy = function() {
					img.onerror = function() {};
					img.onload = function() {};
					img.src = '';
					item.remove();
				};
			};
			this.append = function(element) {
				var _this = this;
				var item$1 = new _this.item(element);
				item$1.render().on('hover:focus hover:touch', function() {
					scroll.render().find('.last--focus').removeClass('last--focus');
					item$1.render().addClass('last--focus');

					last = item$1.render()[0];
					active = items.indexOf(item$1);
					scroll.update(items[active].render(), true);
				}).on('hover:enter', function() {
					if (element.search_on) {
						Lampa.Input.edit({
							value: '',
							free: true
						}, function(new_value) {
							var query = new_value;
							var u = element.playlist_url && element.playlist_url.indexOf('?') > -1 ? '&' : '/?';
							network["native"](element.playlist_url + u + 'search=' + query + '&' + ForkTV.user_dev(), function(json) {
								if (json.channels[0].title.indexOf('Нет результатов') == -1) {
									Lampa.Activity.push({
										title: element.title,
										url: json,
										submenu: true,
										component: 'forktv',
										page: 1
									});
								} else {
									Lampa.Modal.open({
										title: '',
										size: 'medium',
										html: Lampa.Template.get('error', {
											title: 'Ошибка',
											text: json.channels[0].title
										}),
										onBack: function onBack() {
											Lampa.Modal.close();
											Lampa.Controller.toggle('content');
										}
									});
								}
							});
						});
					} else {
						Lampa.Activity.push({
							title: element.title,
							url: element.playlist_url,
							submenu: false,
							component: 'forktv',
							page: 1
						});
					}
				});
				scroll.append(item$1.render());
				items.push(item$1);
			};
			this.toggle = function() {
				var _this = this;
				Lampa.Controller.add('hdgo_line', {
					toggle: function toggle() {
						Lampa.Controller.collectionSet(scroll.render());
						Lampa.Controller.collectionFocus(last || false, scroll.render());
					},
					right: function right() {
						Navigator.move('right');
						Lampa.Controller.enable('hdgo_line');
					},
					left: function left() {
						if (Navigator.canmove('left')) Navigator.move('left');
						else if (_this.onLeft) _this.onLeft();
						else Lampa.Controller.toggle('menu');
					},
					down: this.onDown,
					up: this.onUp,
					gone: function gone() {},
					back: this.onBack
				});
				Lampa.Controller.toggle('hdgo_line');
			};
			this.render = function() {
				return content;
			};
			this.destroy = function() {
				Lampa.Arrays.destroy(items);
				scroll.destroy();
				content.remove();
				items = null;
			};
		};
		this.appendHdgo = function(data) {
			var _this = this;
			var item = new _this.createHdGO(data);
			item.create();
			item.onDown = this.down.bind(this);
			item.onUp = this.up.bind(this);
			item.onBack = this.back.bind(this);
			scroll.append(item.render());
			items.push(item);
		};
		this.YouTube = function(id) {
			var player, html$7, timer$1;

			function create$f(id) {
				html$7 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
				$('body').append(html$7);
				player = new YT.Player('youtube-player', {
					height: window.innerHeight,
					width: window.innerWidth,
					playerVars: {
						'controls': 0,
						'showinfo': 0,
						'autohide': 1,
						'modestbranding': 1,
						'autoplay': 1
					},
					videoId: id,
					events: {
						onReady: function onReady(event) {
							event.target.playVideo();
							update$2();
						},
						onStateChange: function onStateChange(state) {
							if (state.data == 0) {
								Lampa.Controller.toggle('content');
							}
						}
					}
				});
			}

			function update$2() {
				timer$1 = setTimeout(function() {
					var progress = player.getCurrentTime() / player.getDuration() * 100;
					$('#youtube-player__progress').css('width', progress + '%');
					update$2();
				}, 400);
			}

			function play(id) {
				create$f(id);
				Lampa.Controller.add('youtube', {
					invisible: true,
					toggle: function toggle() {},
					right: function right() {
						player.seekTo(player.getCurrentTime() + 10, true);
					},
					left: function left() {
						player.seekTo(player.getCurrentTime() - 10, true);
					},
					enter: function enter() {},
					gone: function gone() {
						destroy$2();
					},
					back: function back() {
						Lampa.Controller.toggle('content');
					}
				});
				Lampa.Controller.toggle('youtube');
			}

			function destroy$2() {
				clearTimeout(timer$1);
				player.destroy();
				html$7.remove();
				html$7 = null;
			}
			play(id);
		};
		this.contextmenu = function(params) {
			var _this = this;
			contextmenu_all.push(params);
			var enabled = Lampa.Controller.enabled().name;
			var menu = [{
				title: Lampa.Lang.translate('torrent_parser_label_title'),
				mark: true
			}, {
				title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
				clearmark: true
			}, {
				title: Lampa.Lang.translate('online_title_clear_all_mark'),
				clearmark_all: true
			}, {
				title: Lampa.Lang.translate('time_reset'),
				timeclear: true
			}, {
				title: Lampa.Lang.translate('online_title_clear_all_timecode'),
				timeclear_all: true
			}, {
				title: Lampa.Lang.translate('copy_link'),
				copylink: true
			}];
			if (Lampa.Platform.is('webos')) {
				menu.push({
					title: Lampa.Lang.translate('player_lauch') + ' - Webos',
					player: 'webos'
				});
			}
			if (Lampa.Platform.is('android')) {
				menu.push({
					title: Lampa.Lang.translate('player_lauch') + ' - Android',
					player: 'android'
				});
			}
			menu.push({
				title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
				player: 'lampa'
			});
			Lampa.Select.show({
				title: Lampa.Lang.translate('title_action'),
				items: menu,
				onBack: function onBack() {
					Lampa.Controller.toggle(enabled);
				},
				onSelect: function onSelect(a) {
					if (a.clearmark) {
						Lampa.Arrays.remove(params.viewed, params.hash_file);
						Lampa.Storage.set('online_view', params.viewed);
						params.item.find('.torrent-item__viewed').remove();
					}
					if (a.clearmark_all) {
						contextmenu_all.forEach(function(params) {
							Lampa.Arrays.remove(params.viewed, params.hash_file);
							Lampa.Storage.set('online_view', params.viewed);
							params.item.find('.torrent-item__viewed').remove();
						});
					}
					if (a.mark) {
						if (params.viewed.indexOf(params.hash_file) == -1) {
							params.viewed.push(params.hash_file);
							params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
							Lampa.Storage.set('online_view', params.viewed);
						}
					}
					if (a.timeclear) {
						params.view.percent = 0;
						params.view.time = 0;
						params.view.duration = 0;
						Lampa.Timeline.update(params.view);
						Lampa.Arrays.remove(params.viewed, params.hash_file);
						params.item.find('.torrent-item__viewed').remove();
						Lampa.Storage.set('online_view', params.viewed);
					}
					if (a.timeclear_all) {
						contextmenu_all.forEach(function(params) {
							params.view.percent = 0;
							params.view.time = 0;
							params.view.duration = 0;
							Lampa.Timeline.update(params.view);
							Lampa.Arrays.remove(params.viewed, params.hash_file);
							params.item.find('.torrent-item__viewed').remove();
							Lampa.Storage.set('online_view', params.viewed);
						});
					}
					Lampa.Controller.toggle(enabled);
					if (a.player) {
						Lampa.Player.runas(a.player);
						params.item.trigger('hover:enter');
					}
					if (a.copylink) {
						Lampa.Utils.copyTextToClipboard(params.file, function() {
							Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
						}, function() {
							Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
						});
					}
				}
			});
		};
		this.empty = function() {
			var empty = new Lampa.Empty();
			scroll.append(empty.render());
			this.start = empty.start;
			this.activity.loader(false);
			this.activity.toggle();
		};
		this.start = function() {
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					if (object.title == 'HDGO' && items.length) {
						items[active].toggle();
					} else {
						Lampa.Controller.collectionSet(scroll.render(), html);
						Lampa.Controller.collectionFocus(last || false, scroll.render());
					}
				},
				left: function left() {
					if (Navigator.canmove('left')) {
						Navigator.move('left');
					} else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					Navigator.move('right');
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up');
					else Lampa.Controller.toggle('head');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
				},
				back: this.back
			});
			Lampa.Controller.toggle('content');
		};
		this.down = function() {
			active++;
			active = Math.min(active, items.length - 1);
			items[active].toggle();
			scroll.update(items[active].render());
		};
		this.up = function() {
			active--;
			if (active < 0) {
				active = 0;
				Lampa.Controller.toggle('head');
			} else {
				items[active].toggle();
			}
			scroll.update(items[active].render());
		};
		this.back = function() {
			Lampa.Activity.backward();
		};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			network.clear();
			scroll.destroy();
			html.remove();
			body.remove();
			network = null;
			items = null;
			html = null;
			body = null;
		};
	}

	function modss_tv(object) {
		var _this1 = this;

		function Api() {
			var network = new Lampa.Reguest();
			var _this = this;
			this.get = function() {
				if (object.url.indexOf('pub/tvs') > -1) {
					network.silent(object.url, _this1.build.bind(this), function(json) {
						var empty = new Lampa.Empty();
						html.append(empty.render());
						_this.start = empty.start;
						_this.activity.loader(false);
						_this.activity.toggle();
					}, {
						id: 'YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20='
					});
				} else if (object.url.indexOf('Fork') > -1) {
					network['native'](object.url, function(str) {
						_this.parsePlaylist(str);
					}, function(a, c) {
						Lampa.Noty.show(network.errorDecode(a, c));
					}, false, {
						dataType: 'text'
					});
				} else {
					var pl = [{
						"name": "Kulik",
						"url": "kulik"
					}, {
						"name": "FreeTv",
						"url": "free"
					}]
					_this1.list(pl);
				}
			};
			this.parsePlaylist = function(data) {
				var postdata = data ? {
					datas: data,
					id: 'YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20='
				} : {
					url: object.url,
					id: 'YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20='
				};
				if (data) postdata['datas'] = data;
				if (object.url == 'kulik') postdata['server'] = _server;
				network.clear();
				network.timeout(15 * 1000);
				network.silent(API + 'tvPL', function(data) {
					if (data.length) _this1.build(data);
					else _this1.empty(data || '');
					object.data = data;
				}, function(a, c) {
					_this1.empty({
						title: network.errorDecode(a, c),
						descr: ''
					});
				}, postdata);
			};
			this.parseEpg = function(name, id) {
				return new Promise(function(resolve, reject) {
					network.clear();
					network.timeout(15 * 1000);
					network.silent(API + 'EPG', function(json) {
						resolve(json);
					}, function(a, c) {
						Lampa.Noty.show(network.errorDecode(a, c));
					}, {
						id_ch: id,
						name: name,
						id: 'YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20='
					});
				});
			};
			this.destroy = function() {
				network.clear();
			};
		}
		var api = new Api();

		var scroll = new Lampa.Scroll({
			mask: true,
			over: true
		});
		var scroll_details = new Lampa.Scroll({
			mask: true,
			over: true
		});
		var scroll_list;
		var items = [];
		var html = $('<div class="modss_tv"></div>');
		var body = $('<div class="category-full"></div>');
		var filter = new Lampa.Filter(object);
		var filter_sources = [];
		var results = [];
		var active = 0;
		var last;
		var timer;
		var list = false;
		var searched = false;
		var cache_cat = Lampa.Storage.cache('Modss_tv_cat', 10, {});
		var _server = Lampa.Storage.get('serv_kulik', 'ru');
		var cache_name = object.url.indexOf('Fork') > -1 ? 'forktv' : object.url.indexOf('pub/tv') > -1 ? 'pubTv' : object.url;
		var html_details = Lampa.Template.get('mods_iptv_details');
		var privated = /18+|ночная|эроти|взросл|xxx/;
		var noGroup = 'IPTV';
		var servOpt = 'Выбрать сервер';
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			api.get();

			function include(url) {
				var script = document.createElement('script');
				script.src = url;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
			include('https://www.googletagmanager.com/gtag/js?id=G-VCR95LEVXD');
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-VCR95LEVXD');
			Lampa.Background.immediately(API.replace('api.', '') + 'tv_bg.jpg');
			return this.render();
		};
		this.list = function(data) {
			var _this = this;
			var html_list = Lampa.Template.get('mods_iptv_list');
			if (scroll_list) scroll_list.destroy();
			scroll_list = new Lampa.Scroll({
				mask: true,
				over: true
			});
			html_list.find('.iptv-list__items').append(scroll_list.render());
			data = data.length > 2 ? data.slice(0, 2).concat(data.slice(2).reverse()) : data;
			data.forEach(function(item) {
				var li = $('<div class="iptv-list__item selector"><div class="iptv-list__item-name">' + (item.name || Lampa.Lang.translate('player_playlist')) + '</div><div class="iptv-list__item-url">' + item.url + '</div></div>');
				li.on('hover:enter', function() {
					_this.activity.loader(true);
					object.url = item.url;
					cache_name = item.url;
					object.title = item.name;
					html.empty();
					api.parsePlaylist();
					list = true;
				}).on('hover:focus hover:touch', function() {
					scroll_list.update(li);
				});
				scroll_list.append(li);
			});
			html.append(html_list);
			_this.activity.loader(false);
			_this.activity.toggle();
		};
		this.saveCats = function() {
			var item = [];
			if (!cache_cat[cache_name]) {
				var c = {};
				for (var key in results) {
					item.push({
						title: key,
						checkbox: true
					});
				}
				cache_cat[cache_name] = item;
				Lampa.Storage.set('Modss_tv_cat', cache_cat);
			}
			var p = (cache_cat && cache_cat[cache_name] || item).filter(function(i) {
				return i.checked;
			}).map(function(i) {
				return i.title;
			});

			var filter_source = [];
			Lampa.Arrays.getKeys(results).forEach(function(f) {
				if (results[f].length) {
					if (p.length > 0) {
						if (p.indexOf(f) > -1) filter_source.push({
							title: f + ' - ' + results[f].length
						});
					} else filter_source.push({
						title: f + ' - ' + results[f].length
					});
				}
			});
			filter_sources = filter_source;

			if (!filter_sources.find(function(a) {
				return a.selected;
			}));
			var lasts = Lampa.Storage.get('mods_tv_last_cat', filter_sources[0] && filter_sources[0].title);


			var enabled = Lampa.Controller.enabled().name;
			var server = {
				title: servOpt,
				onSelect: function onSelect() {
					Lampa.Controller.toggle(enabled);
					var items = results[servOpt].map(function(s, index) {
						return {
							title: s.title,
							url: s.servsmodstv_url,
							tv: true,
							icon: '<img src="' + s.logo + '" />',
							template: 'selectbox_icon',
							selected: s.servsmodstv_url == _server
						};
					});

					Lampa.Select.show({
						title: servOpt,
						// fullsize: true,
						items: items,
						onSelect: function onSelect(a) {
							_server = a.url;
							Lampa.Storage.set('serv_kulik', a.url);
							_this1.clear(true);
							results = [];
							_this1.activity.loader(true)
							api.parsePlaylist();
							Lampa.Controller.toggle(enabled);
						},
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						}
					});
				}
			}

			filter_sources.forEach(function(i, k) {
				if (i.title.split(' - ')[0] == servOpt) filter_sources[k] = server;
				if (i.title.split(' - ')[0] == lasts) filter_sources[k].selected = true;
			});
			if (object.url == 'kulik' && filter_sources[0].title.split(' - ')[0] == 'Избранные') filter_sources = [filter_sources[1]].concat(filter_sources.slice(0, 1), filter_sources.slice(2));

			var fil = filter_sources.find(function(a) {
				return a.selected;
			});
			return fil;
		};
		this.create_cats = function() {
			var _this = this;
			var item = [];
			if (!cache_cat[cache_name]) {
				for (var key in results) {
					item.push({
						title: key.split(' - ')[0],
						checkbox: true
					});
				}
			} else item = cache_cat[cache_name];

			function select(where, a) {
				where.forEach(function(element) {
					element.selected = false;
				});
				a.selected = true;
			}

			function main() {
				var catg = [];
				item.forEach(function(a) {
					catg.push(a);
				});
				if (catg.length > 0) {
					cache_cat[cache_name] = catg;
					Lampa.Storage.set('Modss_tv_cat', cache_cat);
					var next = Lampa.Arrays.clone(object);
					delete next.activity;
					Lampa.Activity.push(next);
				}
				Lampa.Controller.toggle('content');
			}
			Lampa.Select.show({
				items: item,
				title: cache_cat[cache_name] ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
				onBack: main,
				onSelect: function onSelect(a) {
					select(item, a);
					main();
				}
			});
		};
		this.buildFilter = function() {
			var _this5 = this;

			function push_cont(a) {
				_this5.clear(false);
				var group = a.title.split(' - ')[0];
				Lampa.Storage.set('mods_tv_last_cat', group);
				html.find('.items-line').remove();
				_this5.append_l({
					title: group,
					results: results[group]
				});
				setTimeout(Lampa.Select.close, 10);
				_this5.updateFilter([]);
			}
			if (Lampa.Storage.field('mods_tv_style') == 'cats') filter.render().find('.filter--search').hide();
			filter.render().find('.filter--search').unbind('hover:enter').on('hover:enter', function(e) {
				Lampa.Input.edit({
					value: "",
					title: "Введите имя канала",
					free: true
				}, function(t) {
					if (!t) {
						Lampa.Controller.toggle('content');
						return;
					}
					var data = [];
					Lampa.Arrays.getValues(results).forEach(function(i) {
						i.find(function(l) {
							if (l.name && encodeURIComponent(l.name.trim().toLowerCase()).match(encodeURIComponent(t.trim().toLowerCase()))) data.push(l);
						});
					});
					if (data && data.length) {
						_this5.clear(true);
						searched = true;
						_this5.build(data);
					} else Lampa.Noty.show(Lampa.Lang.translate('online_query_start') + ' (' + t + ') ' + Lampa.Lang.translate('online_query_end'));
					Lampa.Controller.toggle('content')
				});
			});
			filter.render().find('.filter--filter').on('hover:enter', function(e) {
				$('body').find('.selectbox__title').text(Lampa.Lang.translate('title_category'));
				last = e.target;
			});
			filter.render().find('.filter--sort').on('hover:enter', function() {
				_this5.create_cats();
			});
			filter.render().find('.selector').on('hover:focus', function() {
				scroll.update($(this));
			})
			filter.render().find('.filter--search span').text(Lampa.Lang.translate('search'));
			filter.render().find('.filter--filter span').text(Lampa.Lang.translate('title_category'));
			filter.onSelect = function(type, a, b) {
				if (type == 'filter') {
					if (a.title.toLowerCase().match(privated) && Lampa.Storage.get('mods_password')) {
						_this5.password(function() {
							push_cont(a);
						});
					} else push_cont(a);
				}
			};
			filter.onBack = function() {
				Lampa.Controller.toggle('content');
			};
			_this5.updateFilter([]);
		};
		this.updateFilter = function(data) {
			var _this = this;
			var fil = filter_sources.find(function(a) {
				return a.selected;
			});

			filter.set('sort', filter_sources);
			if (Lampa.Storage.field('mods_tv_style') == 'vert') filter.set('filter', filter_sources);
			var group = fil && fil.title.split(' - ')[0] || filter_sources[0] && filter_sources[0].title.split(' - ')[0] || cache_cat[0] && cache_cat[0].title.split(' - ')[0];
			filter.chosen('filter', [group]);
		};
		this.build = function(data, f) {
			var _this = _this1;
			if (data && (data.length || Lampa.Arrays.getKeys(data).length)) {
				Lampa.Template.add('epg', '<div class="info"></div>');
				var info = Lampa.Template.get('epg');
				if (object.url.indexOf('Fork') == -1 && Lampa.Storage.field('mods_tv_style') == 'vert') {
					scroll_details.append(html_details);
					scroll_details.minus();
				}

				if (!html.find('.info').length) {
					if (Lampa.Storage.field('mods_tv_style') !== 'cats' && object.url.indexOf('pub/tv') == -1) html.append(info.append(filter.render()));
					scroll.render().addClass('layer--wheight').data('mheight', info.css('max-height', '5em'));
					html.append(scroll.render());
				}
				scroll.append(body);

				if (object.url.indexOf('Fork') == -1 && Lampa.Storage.field('mods_tv_style') == 'vert') {
					html.find('.scroll:eq(1)').css({
						'position': 'relative',
						'min-height': '30em'
					}).append('<div class="epg" style="position:absolute;width:100%;top:15em;left:0;"><div class="program"></div></div>');
					html.find('.program').append(scroll_details.render());
				}

				_this.builder(data);
				_this.buildFilter();
				_this.activity.loader(false);
				_this.activity.toggle();
			} else {
				return _this.empty();
			}
		};
		this.builder = function(data) {
			var _this = this;
			var fav = [];
			data && data.forEach(function(itm) {
				Lampa.Arrays.getValues(_this.getFavorites()).filter(function(name) {
					if (itm.name == name) fav.push(itm);
				});
			});

			if (fav.length && !searched && Lampa.Arrays.getKeys(_this.getFavorites()).length) {
				if (Lampa.Storage.field('mods_tv_style') == 'line') _this.append_l({
					title: 'Избранные каналы',
					results: fav
				});
				else results['Избранные'] = fav;
			}

			if (data && (data.length || Lampa.Arrays.getKeys(data).length)) {
				!searched && data.forEach(function(element) {
					if (element.items) results[element.group || 'IPTV'] = element.items;
					else if (element.servsmodstv_url && !results[servOpt]) results[servOpt] = [element];
					else if (element.servsmodstv_url && results[servOpt]) results[servOpt].push(element);
					else if (results[element.group || 'IPTV']) results[element.group || 'IPTV'].push(element);
					else results[element.group || 'IPTV'] = [element];
				});

				if (searched && searched.length) _this.append_l({
					title: Lampa.Lang.translate('search'),
					results: data,
				});
				else if (object.url.indexOf('pub/tv') == -1 && object.url.indexOf('Fork') == -1 && Lampa.Storage.field('mods_tv_style') == 'cats') {
					var cards = [];
					Lampa.Arrays.getKeys(results).forEach(function(e) {
						cards.push({
							name: e + ' - ' + results[e].length,
							picture: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDMwLjEgMTkySDgxLjljLTE3LjcgMC0xOC42IDkuMi0xNy42IDIwLjVsMTMgMTgzYy45IDExLjIgMy41IDIwLjUgMjEuMSAyMC41aDMxNi4yYzE4IDAgMjAuMS05LjIgMjEuMS0yMC41bDEyLjEtMTg1LjNjLjktMTEuMiAwLTE4LjItMTcuNy0xOC4yek00MjYuMiAxNDMuM2MtLjUtMTIuNC00LjUtMTUuMy0xNS4xLTE1LjNIMjY3LjljLTIxLjggMC0yNC40LjMtNDAuOS0xNy40LTEzLjctMTQuOC04LjMtMTQuNi0zNi42LTE0LjZoLTc1LjNjLTE3LjQgMC0yMy42LTEuNS0yNS4yIDE2LjYtMS41IDE2LjctNSA1Ny4yLTUuNSA2My40aDM0My40bC0xLjYtMzIuN3oiIGZpbGw9IiM1NDUxNTEiIGNsYXNzPSJmaWxsLTAwMDAwMCI+PC9wYXRoPjwvc3ZnPg==',
							results: results[e]
						});
					});
					_this.append_v(cards);
				} else if (Lampa.Storage.field('mods_tv_style') == 'line') {
					if (Lampa.Arrays.getKeys(results).length == 1) _this.append_v(results['IPTV']);
					else {
						_this.saveCats();
						for (var key in results) {
							if (filter_sources.find(function(a) {
								return a.title.split(' - ')[0] == key;
							})) _this.append_l({
								title: key,
								results: results[key]
							});
						}
					}
				} else {
					var fil = _this1.saveCats();
					var title = (Lampa.Arrays.getKeys(fil).length && fil.title || filter_sources[0] && ((filter_sources[0].title && filter_sources[0].title.indexOf(servOpt) == -1) && filter_sources[0].title || filter_sources[1].title)).split(' - ')[0];
					if (title.toLowerCase().match(privated) && Lampa.Storage.get('mods_password')) {
						_this.password(function() {
							_this.append_l({
								title: title,
								results: results[title]
							});
							Lampa.Controller.toggle('content');
						});
					} else {
						if (object.url.indexOf('Fork') > -1 || object.url.indexOf('pub/tv') > -1) _this.append_v(results[title]);
						else {
							_this.append_l({
								title: title,
								results: results[title]
							});
						}
					}
				}
			}
		};
		this.append_v = function(data) {
			var _this3 = this;
			data.forEach(function(element) {
				var card = Lampa.Template.get('card', {
					title: element.results ? element.name : '',
					release_year: ''
				}).attr('data-url', element.video).attr('data-id', element.id);
				card.addClass('card--collection');
				if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) {
					card.addClass('tv_pc');
					if (!element.results) card.addClass('tv_pc_c');
				}
				if (Lampa.Platform.tv() || /SMART-TV/i.test(navigator.userAgent)) {
					card.addClass('tv_tv');
					if (!element.results) card.addClass('tv_tv_c');
				}
				if ((object.url.indexOf('Fork') > -1 || Lampa.Storage.field('mods_tv_style') == 'cats') || object.url.indexOf('pub/tv') > -1) if (/iPhone|android/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight > 600)) card.addClass('mobile_tv');
				var alt_img = API.replace('api.', '') + 'epg/img/' + encodeURIComponent(element.name && element.name.trim()) + '.png';
				var img = card.find('.card__img')[0];
				var image = element.tvlogo || element.logo || element.picture || alt_img;
				img.onload = function() {
					card.addClass('card--loaded');
				};
				img.onerror = function(e) {
					//img.src = './img/img_broken.svg';
					if (!image && e.type == 'error') {
						card.find('.card__img').remove();
						card.find('.card__view').append('<div class="card__img modss-channel__name">' + (element.name || element.title) + '</div>');
					} else {
						img.src = alt_img;
						img.onerror = function(e) {
							card.find('.card__img').remove();
							card.find('.card__view').append('<div class="card__img modss-channel__name">' + (element.name || element.title) + '</div>');
						};
					}
				};
				if (image) img.src = image;
				else img.onerror();

				var in_favorite = _this3.getFavorites().indexOf(element.name) >= 0;
				if (in_favorite) _this1.addicon('like', card);

				//console.log('class ', card[0].className, ' | Platform', Lampa.Platform.get(), ' | width ', window.innerWidth)
				card.on('hover:focus hover:touch', function(e, is_mouse) {
					if (!element.title && !element.results && (object.url.indexOf('pub/tv') == -1 && (Lampa.Storage.field('mods_tv_style') == 'cats' && object.url.indexOf('Fork') == -1)) && (Lampa.Storage.field('mods_tv_style') == 'cats' || Lampa.Storage.field('mods_tv_style') == 'vert')) _this3.epg(element.epg_name || element.name, element.id);
					last = card[0];
					scroll.update(card, true);
				}).on('hover:long', function() {
					if (element.title || data[0].results || object.url.indexOf('pub/tv') > -1) return;
					var enabled = Lampa.Controller.enabled().name;
					var menu = [];
					if (object.url.indexOf('Fork') > -1 || Lampa.Storage.field('mods_tv_style') == 'vert') menu.push({
						title: 'Открыть ТВ Программу',
						epg: true
					});
					menu.push({
						title: in_favorite ? Lampa.Lang.translate('iptv_remove_fav') : Lampa.Lang.translate('iptv_add_fav'),
						fav: true
					}, {
						title: Lampa.Lang.translate('copy_link'),
						copy: true
					});
					if (Lampa.Platform.is('android')) {
						menu.push({
							title: Lampa.Lang.translate('player_lauch') + ' - Android',
							player: 'android'
						});
					}
					Lampa.Select.show({
						title: Lampa.Lang.translate('title_action'),
						items: menu,
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						},
						onSelect: function onSelect(a) {
							if (a.epg) _this1.tvtable({
								name: element.name,
								id: element.id
							}, 'tvtable');
							if (a.fav) {
								in_favorite = !in_favorite;
								_this1.favorite(element, card);
								Lampa.Controller.toggle(enabled);
							}
							if (a.copy) {
								Lampa.Utils.copyTextToClipboard(element.video, function() {
									Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
								}, function() {
									Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
								});
							}
							Lampa.Controller.toggle(enabled);
							if (a.player) {
								Lampa.Player.runas(a.player);
								card.trigger('hover:enter');
							}
						}
					});
				}).on('hover:enter', function() {
					function added() {
						_this3.clear();
						searched = true;
						Lampa.Storage.set('mods_tv_last_cat', element.name.split(' - ').shift());
						_this3.append_v(element.results);
						scroll_details.append(html_details);
						scroll_details.minus();
						html.find('.info').remove();
						html.find('.scroll:eq(0)').css({
							'float': 'left',
							'width': '60%'
						}).parent().append('<div class="epg" style="float:right;width: 40%;"><div class="program"></div></div>');
						html.find('.program').append(scroll_details.render());
						Lampa.Controller.toggle('content');
					}
					if (element.results) {
						if (element.name.toLowerCase().match(privated) && Lampa.Storage.get('mods_password')) {
							_this3.password(function() {
								added();
							});
						} else added();
					} else {
						if (element.servsmodstv_url) {
							_server = element.servsmodstv_url;
							Lampa.Storage.set('serv_kulik', element.servsmodstv_url);
							_this1.clear(true);
							results = [];
							_this1.activity.loader(true);
							Lampa.Activity.replace();
						} else {
							if (!element.video) return Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));
							if (element.video.match(/png|jpeg|jpg|bmp/)) return;
							var playlist = [];
							data.forEach(function(elem, i) {
								var ico = elem.tvlogo || elem.logo || elem.picture || 'http://lampa.stream/epg/img/' + encodeURIComponent(elem.name.trim()) + '.png';
								playlist.push({
									title: ++i + ' - ' + elem.name,
									url: elem.video,
									id: elem.id,
									tv: true,
									icon: '<img src="' + ico + '" />',
									template: 'selectbox_icon'
								});
							});
							Lampa.Player.play({
								title: element.name,
								url: element.video,
								tv: true
							});
							Lampa.Player.playlist(playlist);
							_this1.tvtable({
								name: element.name,
								id: element.id,
								url: element.video
							}, 'player');
						}
					}
				});
				body.append(card);
				items.push(card);
			});
		};
		this.append_l = function(element) {
			var _this = this;
			var item = new _this.creates(element);
			item.create();
			item.onDown = this.down.bind(this);
			item.onUp = this.up.bind(this);
			item.onBack = this.back.bind(this);
			scroll.append(item.render());
			items.push(item);
		};
		this.creates = function(data) {
			var content = Lampa.Template.get('items_line', {
				title: data.title
			});
			var body = content.find('.items-line__body');
			var scroll = new Lampa.Scroll({
				horizontal: true,
				step: 300
			});
			var items = [];
			var active = 0;
			var last;

			this.create = function() {
				scroll.render().find('.scroll__body').addClass('items-cards');
				content.find('.items-line__title').text(data.title + ' (' + (data && data.results.length || '') + ')');
				data.results.forEach(this.append.bind(this));
				body.append(scroll.render());
			};
			this.item = function(data) {
				var _this = this;
				var item = Lampa.Template.get('hdgo_item', {
					title: data.name || data.title
				}).attr('data-title', data.name || data.title).attr('data-url', data.video || data.tvmedia).attr('data-id', data.id);
				item.addClass('card--collection modss__tv').find('.card__age').remove();
				//if ((data.group == '18+' || data.group == 'Ночная лампа' || data.group == 'Эротика') && Lampa.Storage.get('mods_password')) item.addClass('nuamtv');
				if (/iPhone|x11|nt/i.test(navigator.userAgent) && !Lampa.Platform.is('android')) item.addClass('hdgo pc');
				if (Lampa.Platform.tv() || /SMART-TV/i.test(navigator.userAgent)) item.addClass('hdgo tv');
				if (/iPhone|android/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight > 600)) item.addClass('mobile');
				var img = item.find('img')[0];
				var alt_img = API.replace('api.', '') + 'epg/img/' + encodeURIComponent(data.name && data.name.trim()) + '.png';

				var image = data.picture || data.tvlogo || data.logo || alt_img;
				img.onload = function() {
					item.addClass('card--loaded');
				};
				img.onerror = function(e) {
					//img.src = './img/img_broken.svg';
					if (!image && e.type == 'error') {
						item.find('.hdgo-item__imgbox img').remove()
						item.find('.hdgo-item__imgbox').append('<div class="hdgo-item__img modss-channel__name">' + (data.name || data.title) + '</div>');
					} else {
						img.src = alt_img;
						img.onerror = function(e) {
							item.find('.hdgo-item__imgbox img').remove()
							item.find('.hdgo-item__imgbox').append('<div class="hdgo-item__img modss-channel__name">' + (data.name || data.title) + '</div>');
						};
					}
				};

				if (image) img.src = image;
				else img.onerror();
				this.render = function() {
					return item;
				};
				this.destroy = function() {
					img.onerror = function() {};
					img.onload = function() {};
					img.src = '';
					item.remove();
				};
			};
			this.append = function(element) {
				var _this = this;
				var item$1 = new _this.item(element);

				var in_favorite = _this1.getFavorites().indexOf(element.name || element.tvtitle) >= 0;
				if (data.title.indexOf('Избранные') > -1 || in_favorite) _this1.addicon('like', item$1.render());

				if (element.servcdn) item$1.render().find('.card__icons').append('<div class="card__type" style="display:none;top:-.3em!important;left:.7em!important">' + element.servcdn + '</div>');
				item$1.render().on('hover:focus hover:touch', function() {
					$('.card__type').hide();
					$(this).find('.card__type').show();
					if (Lampa.Storage.field('mods_tv_style') == 'vert') {
						_this1.epg(element.epg_name || element.name || element.tvtitle, element.id);
					}
					scroll.render().find('.last--focus').removeClass('last--focus');
					item$1.render().addClass('last--focus');
					last = item$1.render()[0];
					active = items.indexOf(item$1);
					scroll.update(items[active].render(), true);
				}).on('hover:long', function() {
					if (element.servsmodstv_url) return;
					var enabled = Lampa.Controller.enabled().name;
					var menu = [];
					if (Lampa.Storage.field('mods_tv_style') == 'line') menu.push({
						title: 'Открыть ТВ Программу',
						epg: true
					});
					menu.push({
						title: in_favorite ? Lampa.Lang.translate('iptv_remove_fav') : Lampa.Lang.translate('iptv_add_fav'),
						fav: true
					}, {
						title: Lampa.Lang.translate('copy_link'),
						copy: true
					});
					if (Lampa.Platform.is('android')) {
						menu.push({
							title: Lampa.Lang.translate('player_lauch') + ' - Android',
							player: 'android'
						});
					}
					Lampa.Select.show({
						title: Lampa.Lang.translate('title_action'),
						items: menu,
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						},
						onSelect: function onSelect(a) {
							if (a.epg) _this1.tvtable({
								name: element.name || element.tvtitle,
								id: element.id
							}, 'tvtable');
							if (a.fav) {
								in_favorite = !in_favorite;
								_this1.favorite(element, items[active].render());
								Lampa.Controller.toggle(enabled);
							}
							if (a.copy) {
								Lampa.Utils.copyTextToClipboard(element.video, function() {
									Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
								}, function() {
									Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
								});
							}
							Lampa.Controller.toggle(enabled);
							if (a.player) {
								Lampa.Player.runas(a.player);
								item$1.render().trigger('hover:enter');
							}
						}
					});
				}).on('hover:enter', function() {
					if (!element.video) return Lampa.Noty.show(Lampa.Lang.translate('modss_nolink'));

					function play() {
						if ((element.video || element.tvmedia).match(/png|jpeg|jpg|bmp/)) return;
						var video = {
							title: element.name || element.tvtitle,
							url: element.video || element.tvmedia,
							tv: true
						};
						var playlist = [];
						var playlists = [];
						items.forEach(function(elem, i) {
							playlists.push({
								title: $(elem.render()).attr('data-title'),
								url: $(elem.render()).attr('data-url'),
							});
							playlist.push({
								title: ++i + ' - ' + $(elem.render()).attr('data-title'),
								url: $(elem.render()).attr('data-url'),
								id: $(elem.render()).attr('data-id'),
								tv: true,
								icon: '<img src="' + $(elem.render()).find('img').attr('src') + '" />',
								template: 'selectbox_icon'
							});
						});
						video['playlist'] = playlists;
						Lampa.Player.play(video);
						Lampa.Player.playlist(playlist);
						_this1.tvtable({
							name: element.name || element.tvtitle,
							id: element.id,
							server: element.servcdn
						}, 'player');
					}
					if (element.servsmodstv_url) {
						_server = element.servsmodstv_url;
						Lampa.Storage.set('serv_kulik', element.servsmodstv_url);
						_this1.clear(true);
						results = [];
						_this1.activity.loader(true);
						Lampa.Activity.replace();
					} else if ((element.group || element.tvgroup).toLowerCase().match(privated) && Lampa.Storage.get('mods_password')) {
						_this1.password(function() {
							play();
						});
					} else play();
				});
				scroll.append(item$1.render());
				items.push(item$1);
			};
			this.toggle = function() {
				var _this = this;
				Lampa.Controller.add('tv_line', {
					toggle: function toggle() {
						Lampa.Controller.collectionSet(scroll.render());
						Lampa.Controller.collectionFocus(last || false, scroll.render());
					},
					right: function right() {
						Navigator.move('right');
						Lampa.Controller.enable('tv_line');
					},
					left: function left() {
						if (Navigator.canmove('left')) Navigator.move('left');
						else if (_this.onLeft) _this.onLeft();
						else Lampa.Controller.toggle('menu');
					},
					down: this.onDown,
					up: this.onUp,
					gone: function gone() {},
					back: this.onBack
				});
				Lampa.Controller.toggle('tv_line');
			};
			this.render = function() {
				return content;
			};
			this.destroy = function() {
				Lampa.Arrays.destroy(items);
				scroll.destroy();
				content.remove();
				items = null;
			};
		};
		this.epg = function(name, id) {
			var _this = this;
			clearInterval(timer);
			timer = null;
			var epg = html_details.find('.mods_iptv__program');
			//$('.hdgo-item').addClass('nuamtv');
			//if(Lampa.Storage.field('mods_tv_style') == 'cats') 
			$('.mods_epg-load').show();
			api.parseEpg(name, id).then(function(json) {
				$('.mods_epg-load').hide();
				var bod = $('<div class="program-body"><div class="program-list"></div></div>');
				var i = 0;
				json.epg_data.forEach(function(itm) {
					var proc = _this.calcProtcent(_this.timeConverter(itm.time), _this.timeConverter(itm.time_to), _this.timenow());
					var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">  <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
					var bars = '<div class="efir_bar"><div class="player-panel__timeline"><div class="player-panel__position" style="width:' + proc + '%"><div></div></div><div class="player-panel__time" style="font-weight:700;font-size:.8em;bottom:100%;background: rgba(0, 0, 0,.5)!important;left:' + proc + '%">' + _this.leftTime(_this.timeConverter(itm.time_to)) + '</div></div></div>';
					var efir = _this.timeConverter(itm.time_to) > _this.timenow() && _this.timeConverter(itm.time) < _this.timenow();

					if (itm.name && /*i < 11 &&*/ _this.timeConverter(itm.time_to) > _this.timenow()) {
						var li = Lampa.Template.get(itm.icon ? 'epg_modss' : 'notice', {
							time: '<span time-start="' + _this.timeConverter(itm.time) + '">' + _this.timeConverter(itm.time).split(' ')[1].slice(0, -3) + '</span> - <span time-stop="' + _this.timeConverter(itm.time_to) + '">' + _this.timeConverter(itm.time_to).split(' ')[1].slice(0, -3) + '</span>',
							title: (efir && '<div style="float:left;position:relative;margin-right:.5em;bottom:.2em;width: 1.5em;height: 1.5em;">' + ico + '</div>' || '') + (itm.name || ''),
							descr: (efir && bars || '') + (Lampa.Storage.field('mods_tv_style') == 'cats' ? '' : (itm.descr && '' + itm.descr || ''))
						});

						if (itm.icon) {
							li.find('img').attr('src', itm.icon);

							var img = li.find('img')[0];
							var pr = 'http://prx.kulik.uz/';

							var image = itm.icon;
							img.onload = function(e) {
								li.addClass('image--loaded');
							};
							img.onerror = function(e) {
								//img.src = './img/img_broken.svg';
								if (!image && e.type == 'error') {
									li.find('img').remove();
								} else {
									img.src = pr + itm.icon;
									img.onerror = function(e) {
										li.find('img').remove();
									};
								}
							};
						}

						li.on('hover:focus', function(e, is_mouse) {
							last = li[0];
							if (!is_mouse) scroll_details.update(li);
						});
						bod.find('.program-list').append(li);
						i++;
					}
					if (Lampa.Storage.field('mods_tv_style') == 'cats') {
						if (i > 1) {
							$('.notice__descr', li).remove();
							$('.notice__title', li).prepend('• ');
							bod.append('<style>.modss_tv .notice+.notice{margin-top:-2em!important}.modss_tv .notice__descr{margin-top:0em!important}</style>');
						}
					}
				});
				if (Lampa.Storage.field('mods_tv_style') == 'cats') bod.find('.selector:eq(0)').before(Lampa.Lang.translate('<div style="font-size:1.8em;font-weight: 700;margin-left:.5em">#{iptv_now} ' + name + '</div>'));

				bod.find('.selector:eq(0)').after(Lampa.Lang.translate('<div style="font-size:1.5em;font-weight: 700;margin-left:.5em">#{iptv_later}</div>'));
				//$('.hdgo-item').removeClass('nuamtv');
				epg.empty().fadeIn(300).append($('.program-list', bod).html().length ? bod : '<div style="position:relative;font-weight:700;font-size:2em;margin-top:10%;text-align:center">Программа не найдена</div>');
				if ($('.notice:eq(0) .notice__time', epg).html()) timer = setInterval(function() {
					var time = $('.notice:eq(0) .notice__time', epg).html().split(' - ');
					var s = $(time[0]).attr('time-start');
					var f = $(time[1]).attr('time-stop');
					var proc = _this.calcProtcent(s, f, _this.timenow());
					var left = _this.leftTime(f);
					if (left == '00:00') {
						clearInterval(timer);
						timer = null;
						setTimeout(function() {
							_this.epg(name, id);
						}, 1000);
					}
					if (epg.find('.notice')[0]) {
						epg.find('.notice:eq(0) .efir_bar .player-panel__position, #efir .player-panel__position').css({
							width: proc + '%'
						});
						epg.find('.notice:eq(0) .efir_bar .player-panel__time, #efir .player-panel__time').text(left).css({
							left: proc + '%'
						});
					}
				}, 1000);
			}).
			catch (function(error) {
				$('.hdgo-item').removeClass('nuamtv');
				epg.empty().fadeIn(300).append('<div style="position:relative;font-weight:700;font-size:2em;margin-top:10%;text-align:center">Программа не найдена</div>');
			});
		};
		this.tvtable = function(DATA, now) {
			function next(g) {
				_this.tvtable({
					name: g.item.title && g.item.title.split('-')[1].trim() || g.item.title,
					id: g.item.id
				}, 'player');
			}

			function clear() {
				clearInterval(timer);
				timer = null;
				Lampa.PlayerPlaylist.listener.remove('select', next);
				Lampa.Player.render().find('#efir, #title_epg').remove();
			}
			clear();

			var _this = this;
			var enabled = Lampa.Controller.enabled().name;
			var epg = $('<div class="lmtv"></div>');
			if (now == 'tvtable' && $('body').find('.modal').length == 0) Lampa.Modal.open({
				title: 'ТВ программа',
				html: Lampa.Template.get('modal_loading'),
				size: 'medium',
				onBack: function onBack() {
					Lampa.Modal.close();
					Lampa.Controller.toggle(Lampa.Player.opened() ? 'player' : 'content');
					clearInterval(timer);
					timer = null;
				}
			});
			api.parseEpg(DATA.name, DATA.id).then(function(json) {
				json.epg_data.forEach(function(itm) {
					var proc = _this.calcProtcent(_this.timeConverter(itm.time), _this.timeConverter(itm.time_to), _this.timenow());
					var ico = '<svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="radioIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">  <path d="M5.44972845 6C2.18342385 9.2663046 2.18342385 14.7336954 5.44972845 18M8.59918369 8C6.46693877 10.1322449 6.46693877 13.8677551 8.59918369 16M18.5502716 18C21.8165761 14.7336954 21.8165761 9.2663046 18.5502716 6M15.4008163 16C17.5330612 13.8677551 17.5330612 10.1322449 15.4008163 8"/> <circle cx="12" cy="12" r="1"/> </svg>';
					var bars = '<div class="efir_bar"><div class="player-panel__timeline"><div class="player-panel__position" style="width:' + proc + '%"><div></div></div><div class="player-panel__time" style="bottom:-760%;background: rgba(0, 0, 0,.5)!important;left:' + proc + '%">' + _this.leftTime(_this.timeConverter(itm.time_to)) + '</div></div></div>';
					var efir = _this.timeConverter(itm.time_to) > _this.timenow() && _this.timeConverter(itm.time) < _this.timenow();
					if (itm.name && _this.timeConverter(itm.time_to) > _this.timenow()) epg.append(Lampa.Template.get('notice', {
						time: '<span time-start="' + _this.timeConverter(itm.time) + '">' + _this.timeConverter(itm.time).split(' ')[1].slice(0, -3) + '</span> - <span time-stop="' + _this.timeConverter(itm.time_to) + '">' + _this.timeConverter(itm.time_to).split(' ')[1].slice(0, -3) + '</span>',
						title: (efir && '<div style="float:left;position:relative;margin-right:.5em;bottom:.2em;width: 1.5em;height: 1.5em;">' + ico + '</div>' || '') + (itm.name || ''),
						descr: (efir && bars || '') + (itm.descr && '<br>' + itm.descr || '')
					}));
				});
				if (now == 'player') {
					Lampa.PlayerPlaylist.listener.follow('select', next);
					if ($('.notice:eq(1) .notice__time', epg).html()) {
						if (Lampa.Player.render().find('#title_epg').length == 0) Lampa.Player.render().find('.player-info__name').append('<span id="title_epg"></span>');
						Lampa.Player.render().find('#title_epg').text(' - Сейчас: ' + $('.notice:eq(0) .notice__title', epg).text());
						var s = $($('.notice:eq(0) .notice__time', epg).html().split(' - ')[0]).attr('time-start').split(' ')[1].slice(0, -3);
						var f = $($('.notice:eq(0) .notice__time', epg).html().split(' - ')[1]).attr('time-stop').split(' ')[1].slice(0, -3);
						var server = DATA.server ? ' / <b>Сервер:</b> ' + DATA.server : '';
						$('.notice:eq(1) .notice__title', epg).text() && Lampa.Player.render().find('.value--speed span').html('<b>Далее:</b> ' + $('.notice:eq(1) .notice__title', epg).text() + ' (' + s + ' - ' + f + ')' + server);
						if (Lampa.Player.render().find('#efir').length == 0) Lampa.Player.render().find('.player-info__values').after('<div id="efir" style="margin-top:.5em"></div>');
						Lampa.Player.render().find('#efir').html(epg.find('.notice:eq(0) .efir_bar').html());
					}
				} else Lampa.Modal.update(epg.find('.notice').length ? epg : $('<div>Программа не найдена</div>'));
				if ($('.notice:eq(0) .notice__time', epg).html()) timer = setInterval(function() {
					var s = $($('.notice:eq(0) .notice__time', epg).html().split(' - ')[0]).attr('time-start');
					var f = $($('.notice:eq(0) .notice__time', epg).html().split(' - ')[1]).attr('time-stop');
					var proc = _this.calcProtcent(s, f, _this.timenow());
					var left = _this.leftTime(f);
					if (left == '00:00') {
						clear();
						setTimeout(function() {
							_this.tvtable(DATA, now);
						}, 1000);
					}
					if ($('.player-info__body #efir')[0] || $('.notice')[0]) {
						var body = now == 'player' ? Lampa.Player.render() : epg;
						body.find('.notice:eq(0) .efir_bar .player-panel__position, #efir .player-panel__position').css({
							width: proc + '%'
						});
						body.find('.notice:eq(0) .efir_bar .player-panel__time, #efir .player-panel__time').text(left).css({
							left: proc + '%'
						});
					}
				}, 1000);
			}).
			catch (function(error) {
				Lampa.Modal.update(epg.find('.lmtv .notice').length ? epg : $('<div>Программа не найдена</div>'));
			});
			Lampa.Player.callback(function() {
				clear();
				Lampa.Controller.toggle('content');
			});
		};
		this.password = function(call) {
			Lampa.Input.edit({
				value: "",
				title: "Введите пароль доступа",
				free: true,
				nosave: true
			}, function(t) {
				if (Lampa.Storage.get('mods_password') == t) {
					Lampa.Controller.toggle('content');
					call();
				} else {
					Lampa.Noty.show('Неверный пароль.');
					Lampa.Controller.toggle('content');
				}
			});
		};
		this.addicon = function(name, card) {
			card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
		};
		this.getFavorites = function() {
			var favorites = Lampa.Storage.get('fav_chns', {});
			if (!favorites[cache_name]) {
				favorites[cache_name] = [];
				Lampa.Storage.set('fav_chns', favorites);
			}
			return favorites[cache_name];
		};
		this.updateFavorites = function(channels) {
			var favorites = Lampa.Storage.get('fav_chns', {});
			favorites[cache_name] = channels;
			Lampa.Storage.set('fav_chns', favorites);
		};
		this.favorite = function(data, card) {
			var _this = this;
			var fav = [];
			var favorites = this.getFavorites();
			var in_favorite = favorites.indexOf(data.name) >= 0;

			if (in_favorite) Lampa.Arrays.remove(favorites, data.name);
			else favorites.push(data.name);

			in_favorite = !in_favorite;
			this.updateFavorites(favorites);
			if (in_favorite) this.addicon('like', card);
			else card.find('.card__icons-inner').empty();

			if (object.data) {
				object.data.forEach(function(itm) {
					Lampa.Arrays.getValues(favorites).filter(function(name) {
						if (itm.name == name) fav.push(itm);
					});
				});
				results['Избранные'] = fav;
			}

			var name = this.saveCats();
			var cat_inside = Lampa.Storage.get('mods_tv_last_cat');

			if (name == undefined) Lampa.Activity.replace();
			else if (!in_favorite && favorites.length && (name && name.title.indexOf('Избранные') >= 0)) {
				card.remove();
				var favnum = $('.items-line__title', html).text().split('(');
				$('.items-line__title', html).text(favnum[0] + ' (' + (favnum[1].slice(0, -1) - 1) + ')');
			}
			this.updateFilter([]);
		};
		this.calcProtcent = function(start, finish, now) {
			return (new Date(now).getTime() - new Date(start).getTime()) / (new Date(finish).getTime() - new Date(start).getTime()) * 100;
		};
		this.timeConverter = function(UNIX_timestamp) {
			var a = new Date(UNIX_timestamp * 1000);

			function addLeadZero(val) {
				if (val < 10) return '0' + val;
				return val;
			}
			var date = [
			a.getFullYear(),
			addLeadZero(a.getMonth() + 1),
			addLeadZero(a.getDate())].join('-');
			var time = [
			addLeadZero(a.getHours()),
			addLeadZero(a.getMinutes()),
			addLeadZero(a.getSeconds())].join(':');
			return date + ' ' + time;
		};
		this.leftTime = function(end) {
			var EndTime = new Date(end);
			var NowTime = new Date(_this1.timenow());
			var t = EndTime.getTime() - NowTime.getTime();
			var h = Math.floor(t / 1000 / 60 / 60 % 24);
			var m = Math.floor(t / 1000 / 60 % 60);
			var s = Math.floor(t / 1000 % 60);
			if (h < 10) h = "0" + h;
			if (m < 10) m = "0" + m;
			if (s < 10) s = "0" + s;
			var html = (h > 0 && h + ":" || '') + m + ":" + s;
			return html;
		};
		this.timenow = function() {
			var date = new Date(),
				time = date.getTime(),
				ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
			date = new Date(time + ofst * 1000 * 60 * 60);
			time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getDate(), date.getMonth(), date.getFullYear()];
			return time[5] + "-" + ((time[4] + 1) < 10 ? '0' + (time[4] + 1) : (time[4] + 1)) + "-" + (time[3] < 10 ? '0' + time[3] : time[3]) + " " + (time[0] < 10 ? '0' + time[0] : time[0]) + ":" + (time[1] < 10 ? '0' + time[1] : time[1]) + ":" + (time[2] < 10 ? '0' + time[2] : time[2]);
		};
		this.empty = function(msg) {
			var empty = msg == undefined ? new Lampa.Empty() : new Lampa.Empty({
				title: msg.title,
				descr: msg.descr
			});
			html.append(empty.render());
			_this1.start = empty.start;
			_this1.activity.loader(false);
			_this1.activity.toggle();
		};
		this.clear = function(find) {
			object.page = 1;
			last = false;
			items = [];
			body.empty();
			Lampa.Arrays.destroy(items);
			scroll.reset();
			scroll_details.reset();
			clearInterval(timer);
			timer = null;
			if (find && (Lampa.Storage.field('mods_tv_style') == 'line' || Lampa.Storage.field('mods_tv_style') == 'vert')) {
				html_details.find('.mods_iptv__program').empty();
				scroll.clear();
				scroll_details.clear();
			}
			this.activity.loader(false);
		};
		this.back = function() {
			if (searched) {
				_this1.clear(true);
				_this1.build(object.data);
				if (find && Lampa.Storage.field('mods_tv_style') == 'cats') {
					html.find('.scroll:eq(1)').attr('style', '');
					html.find('.epg').remove();
					Lampa.Controller.toggle('content');
				}
				searched = false;
			} else if (list) {
				Lampa.Activity.replace();
				list = false;
			} else Lampa.Activity.backward();
		};
		this.down = function() {
			active++;
			if (Lampa.Storage.field('mods_tv_style') == 'vert' && active == 1) {
				active--;
				_this1.toggleEpg();
			} else {
				active = Math.min(active, items.length - 1);
				items[active].toggle();
				scroll.update(items[active].render());
			}
		};
		this.up = function() {
			active--;
			if (active < 0) {
				active = 0;
				_this1.toggleFilter();
			} else {
				items[active].toggle();
				scroll.update(items[active].render());
			}
		};
		this.toggleFilter = function() {
			var _this = this;
			var last = filter.render().find('.filter--filter')[0];
			Lampa.Controller.add('tv_filter', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(filter.render());
					Lampa.Controller.collectionFocus(last || false, filter.render());
				},
				right: function right() {
					Navigator.move('right');
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');
					else Lampa.Controller.toggle('menu');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
					else Lampa.Controller.toggle('content');
				},
				up: function() {
					Lampa.Controller.toggle('head');
				},
				gone: function gone() {},
				back: this.back
			});
			Lampa.Controller.toggle('tv_filter');
		};
		this.toggleEpg = function() {
			var _this = this;
			Lampa.Controller.add('tv_epg', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll_details.render());
					Lampa.Controller.collectionFocus(false, scroll_details.render());
				},
				right: function right() {
					if (Navigator.canmove('right')) Navigator.move('right');
					else {
						Lampa.Controller.toggle('tv_epg');
						Lampa.Controller.toggle('content');
						Navigator.move('right');
					}
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');
					else {
						Lampa.Controller.toggle('tv_epg');
						Lampa.Controller.toggle('content');
						Navigator.move('left');
					}
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up');
					else Lampa.Controller.toggle('content');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
				},
				gone: function gone() {},
				back: this.back
			});
			Lampa.Controller.toggle('tv_epg');
		};
		this.start = function() {
			var _this6 = this;
			if (Lampa.Activity.active().activity !== this.activity) return;
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					if (!body.find('.card').length && items.length) {
						items[active].toggle();
					} else {
						Lampa.Controller.collectionSet(scroll.render(), html, body, _this6.render());
						Lampa.Controller.collectionFocus(last || false, _this6.render() || scroll.render());
					}
				},
				left: function left() {
					if (Navigator.canmove('left')) {
						Navigator.move('left');
					} else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					if (Navigator.canmove('right')) Navigator.move('right');
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up');
					else Lampa.Controller.toggle('head');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
				},
				back: this.back
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			api.destroy();
			Lampa.Arrays.destroy(items);
			scroll.destroy();
			scroll_details.destroy();
			html.remove();
			items = null;
		};
	}

	function collection(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true,
			step: 250
		});
		var items = [];
		var html = $('<div></div>');
		var body = $('<div class="category-full"></div>');
		var cors = object.sour == 'rezka' || object.sourc == 'rezka' ? Lampa.Utils.protocol() + 'prox.lampa.stream/' : object.sour == 'filmix' || object.sourc == 'filmix' ? 'http://corsanywhere.herokuapp.com/' : '';
		var cache = Lampa.Storage.cache('my_col', 5000, {});
		var info;
		var last;
		var waitload = false;
		var relises = [];
		var total_pages;
		var _this1 = this;
		this.create = function() {
			var _this = this;
			var url;
			if (object.sourc == 'my_coll') {
				_this.build({
					card: cache
				});
			} else {
				if (object.card && isNaN(object.id)) url = object.id;
				else if (object.sourc == 'pub') {
					if (object.search) url = object.url + '?title=' + object.search + '&sort=views-&access_token=' + Pub.token;
					else url = object.url + '?sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
				} else if (object.sourc == 'rezka') url = object.url + '?filter=last';
				else url = object.url;

				if ((object.page == 1 && object.card_cat) || object.cards || (!object.card && !Lampa.Storage.field('light_version') && object.card_cat)) {
					this.activity.loader(true);
					network.silent(cors + url, function(str) {
						var data = _this.card(str);
						_this.build(data);
						if (object.card) $('.head__title').append(' - ' + data.card.length);
					}, function(a, c) {
						_this.empty(network.errorDecode(a, c));
					}, false, {
						dataType: 'text'
					});
				} else _this.build(object.data);
			}
			return this.render();
		};
		this.next = function(page) {
			var _this2 = this;
			var url;
			if (total_pages == 0 || total_pages == page) waitload = true;
			if (waitload) return;
			waitload = true;
			object.page++;
			network.clear();
			network.timeout(1000 * 40);
			if (typeof page == 'undefined') return;
			if (object.sourc == 'pub' && object.sour !== 'rezka') url = object.url + '?page=' + object.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
			else if ((object.sourc == 'rezka' || object.sour == 'rezka') && object.data && object.data.page) url = object.data.page;
			else url = page.replace(/(\d+)\/\?filter/, object.page + '/?filter');
			network.silent(cors + url, function(result) {
				var data = _this2.card(result);
				object.data = data;
				_this2.append(data, true);
				if (data.card.length) waitload = false;
				//Lampa.Controller.toggle('content');
				_this2.activity.loader(false);
			}, function(a, c) {
				Lampa.Noty.show(network.errorDecode(a, c));
			}, false, {
				dataType: 'text'
			});
		};
		this.append = function(data, append) {
			var _this1 = this;
			var datas = Lampa.Arrays.isArray(data.card) ? data.card : Lampa.Arrays.getValues(data.card).reverse();
			datas.forEach(function(element) {
				var card = new Lampa.Card(element, {
					card_category: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? true : false,
					card_collection: object.sourc == 'my_coll' || object.sourc == 'pub' || object.sourc == 'filmix' || !object.card_cat || object.cards ? false : true,
					object: object
				});
				card.create();
				if (object.category && (element.watch || element.quantity)) card.render().find('.card__view').append('<div style="background-color: rgba(0,0,0, 0.7);padding:.5em;position:absolute;border-radius:.3em;right:3;bottom:3">' + (element.watch || element.quantity) + '</div>');
				card.onFocus = function(target, card_data) {
					last = target;
					scroll.update(card.render(), true);
					Lampa.Background.change(card_data.img);
					if (scroll.isEnd()) _this1.next(data.page);
					if (!Lampa.Platform.tv() || !Lampa.Storage.field('light_version')) {
						var maxrow = Math.ceil(items.length / 7) - 1;
						//if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this1.next(data.page);
					}
				};
				card.onEnter = function(target, card_data) {
					last = target;
					if (object.sour == 'rezka' || object.sour == 'filmix' || (Lampa.Storage.field('light_version') && !object.cards) && !object.card_cat || object.cards) {
						Lampa.Api.search({
							query: encodeURIComponent(element.title_org)
						}, function(find) {
							var finded = _this1.finds(element, find);
							if (finded) {
								Lampa.Activity.push({
									url: '',
									component: 'full',
									id: finded.id,
									method: finded.name ? 'tv' : 'movie',
									card: finded
								});
							} else {
								Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
								Lampa.Controller.toggle('content');
							}
						}, function() {
							Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
							Lampa.Controller.toggle('content');
						});
					} else if (object.sourc == 'pub' || object.sourc == 'my_coll') {
						Lampa.Activity.push({
							title: element.title,
							url: object.url + '/view?id=' + (object.sourc == 'my_coll' ? element.id : element.url) + '&access_token=' + Pub.token,
							sourc: 'pub',
							sour: element.source,
							source: 'pub',
							id: element.url,
							card: element,
							card_cat: true,
							component: !object.category ? 'full' : 'collection',
							page: 1
						});
					} else {
						Lampa.Activity.push({
							title: element.title,
							url: element.url,
							component: 'collection',
							cards: true,
							sourc: object.sourc,
							source: object.source,
							page: 1
						});
					}
				};
				card.onMenu = function(target, data) {
					var _this2 = this;
					var enabled = Lampa.Controller.enabled().name;
					var status = Lampa.Favorite.check(data);
					var items = [];
					if (object.category) {
						items.push({
							title: cache['id_' + data.id] ? Lampa.Lang.translate('card_my_clear') : Lampa.Lang.translate('card_my_add'),
							subtitle: Lampa.Lang.translate('card_my_descr'),
							where: 'book'
						});
					} else {
						items.push({
							title: status.book ? Lampa.Lang.translate('card_book_remove') : Lampa.Lang.translate('card_book_add'),
							subtitle: Lampa.Lang.translate('card_book_descr'),
							where: 'book'
						}, {
							title: status.like ? Lampa.Lang.translate('card_like_remove') : Lampa.Lang.translate('card_like_add'),
							subtitle: Lampa.Lang.translate('card_like_descr'),
							where: 'like'
						}, {
							title: status.wath ? Lampa.Lang.translate('card_wath_remove') : Lampa.Lang.translate('card_wath_add'),
							subtitle: Lampa.Lang.translate('card_wath_descr'),
							where: 'wath'
						}, {
							title: status.history ? Lampa.Lang.translate('card_history_remove') : Lampa.Lang.translate('card_history_add'),
							subtitle: Lampa.Lang.translate('card_history_descr'),
							where: 'history'
						});
					}
					if (object.sourc == 'my_coll') {
						items.push({
							title: Lampa.Lang.translate('card_my_clear_all'),
							subtitle: Lampa.Lang.translate('card_my_clear_all_descr'),
							where: 'clear'
						});
					}
					Lampa.Select.show({
						title: Lampa.Lang.translate('title_action'),
						items: items,
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						},
						onSelect: function onSelect(a) {
							if (a.where == 'clear') {
								Lampa.Storage.set('my_col', '');
								Lampa.Activity.push({
									url: object.url,
									sourc: object.sourc,
									source: object.source,
									title: object.title,
									card_cat: true,
									category: true,
									component: 'collection',
									page: 1
								});
								Lampa.Noty.show(Lampa.Lang.translate('saved_collections_clears'));
							} else if (object.category) {
								data.source = object.sourc;
								_this1.favorite(data, card.render());
							} else {
								if (object.sour == 'filmix' || object.sour == 'rezka' || object.sourc == 'rezka' || object.sourc == 'filmix') {
									Lampa.Api.search({
										query: encodeURIComponent(data.title_org)
									}, function(find) {
										var finded = _this1.finds(data, find);
										if (finded) {
											finded.url = (finded.name ? 'tv' : 'movie') + '/' + finded.id;
											Lampa.Favorite.toggle(a.where, finded);
										} else {
											Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
											Lampa.Controller.toggle('content');
										}
									}, function() {
										Lampa.Noty.show(Lampa.Lang.translate('nofind_movie'));
										Lampa.Controller.toggle('content');
									});
								} else {
									data.source = object.source;
									Lampa.Favorite.toggle(a.where, data);
								}
								_this2.favorite();
							}
							Lampa.Controller.toggle(enabled);
						}
					});
				};
				card.visible();
				body.append(card.render());
				if (cache['id_' + element.id]) _this1.addicon('book', card.render());
				if (append) Lampa.Controller.collectionAppend(card.render());
				items.push(card);
			});
		};
		this.addicon = function(name, card) {
			card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
		};
		this.favorite = function(data, card) {
			var _this = this;
			if (!cache['id_' + data.id]) {
				cache['id_' + data.id] = data;
				Lampa.Storage.set('my_col', cache);
			} else {
				delete cache['id_' + data.id];
				Lampa.Storage.set('my_col', cache);
				Lampa.Activity.push({
					url: object.url,
					sourc: object.sourc,
					source: object.source,
					title: object.title,
					card_cat: true,
					category: true,
					component: 'collection',
					page: 1
				});
			}
			card.find('.card__icon').remove();
			if (cache['id_' + data.id]) _this.addicon('book', card);
		};
		this.build = function(data) {
			var _this1 = this;
			if (data.card.length || Lampa.Arrays.getKeys(data.card).length) {
				Lampa.Template.add('info_coll', Lampa.Lang.translate('<div class="info layer--width" style="height:6.2em"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div><div class="full-start__button selector view--category"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="currentColor" d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z"/><path fill="currentColor" d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/></svg>   <span>#{pub_search_coll}</span> </div></div><div class="info__right">  <div class="full-start__button selector view--filter"><svg style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><g id="menu"><path d="M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z" fill="currentColor"/><path d="M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z" fill="currentColor"/><path d="M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z" fill="currentColor"/></g></g></svg>  <span>#{title_filter}</span></div></div></div>'));
				info = Lampa.Template.get('info_coll');
				info.find('.view--category').on('hover:enter hover:click', function() {
					Lampa.Input.edit({
						value: '',
						free: true
					}, function(name) {
						if (name == '') {
							Lampa.Controller.toggle('content');
							return;
						}
						Lampa.Activity.push({
							title: 'Поиск по - ' + name,
							url: Pub.baseurl + 'v1/collections',
							component: 'collection',
							search: name,
							card_cat: true,
							category: true,
							sourc: 'pub',
							source: 'pub',
							page: 1
						});
					});
				});
				info.find('.view--filter').on('hover:enter hover:click', function() {
					var enabled = Lampa.Controller.enabled().name;
					var items = [{
						title: Lampa.Lang.translate('pub_sort_views'),
						id: 'views-'
					}, {
						title: Lampa.Lang.translate('pub_sort_watchers'),
						id: 'watchers-'
					}, {
						title: Lampa.Lang.translate('pub_sort_updated'),
						id: 'updated-'
					}, {
						title: Lampa.Lang.translate('pub_sort_created'),
						id: 'created-'
					}].filter(function(el, i) {
						if (object.sort == el.id) el.selected = true;
						return el;
					});
					Lampa.Select.show({
						title: Lampa.Lang.translate('title_filter'),
						items: items,
						onBack: function onBack() {
							Lampa.Controller.toggle(enabled);
						},
						onSelect: function onSelect(a) {
							Lampa.Activity.push({
								title: Lampa.Lang.translate('title_filter') + ' ' + a.title.toLowerCase(),
								url: Pub.baseurl + 'v1/collections',
								component: 'collection',
								sort: a.id,
								card_cat: true,
								category: true,
								sourc: 'pub',
								source: 'pub',
								page: 1
							});
						}
					});
				});
				scroll.render().addClass('layer--wheight').data('mheight', info);
				if (object.sourc == 'pub' && object.category) html.append(info);
				html.append(scroll.render());
				scroll.onEnd = function() {
					_this1.next(data.page);
				}
				this.append(data);

				//	if (Lampa.Platform.tv() && Lampa.Storage.field('light_version')) this.more(data);
				scroll.append(body);
				this.activity.loader(false);
				this.activity.toggle();
			} else {
				html.append(scroll.render());
				this.empty(object.search ? Lampa.Lang.translate('online_query_start') + ' (' + object.search + ') ' + Lampa.Lang.translate('online_query_end') : '');
			}
		};
		this.empty = function(msg) {
			var empty = msg == undefined ? new Lampa.Empty() : new Lampa.Empty({
				title: '',
				descr: msg
			});
			html.append(empty.render());
			_this1.start = empty.start;
			_this1.activity.loader(false);
			_this1.activity.toggle();
		};
		this.more = function(data) {
			var _this = this;
			//	var more = $('<div class="category-full__more selector"><span>' + Lampa.Lang.translate('show_more') + '</span></div>');
			//	more.on('hover:focus hover:touch', function (e) {
			Lampa.Controller.collectionFocus(last || false, scroll.render());
			var next = Lampa.Arrays.clone(object);
			if (data.total_pages == 0 || data.total_pages == undefined) {
				more.remove();
				return;
			}
			network.clear();
			network.timeout(1000 * 20);
			var url;
			if (object.sourc == 'pub') url = object.url + '?page=' + data.page + '&sort=' + (object.sort ? object.sort : 'views-') + '&access_token=' + Pub.token;
			else url = data.page;
			network.silent(cors + url, function(result) {
				var card = _this.card(result);
				next.data = card;
				if (object.cards) next.cards = false;
				delete next.activity;
				next.page++;
				if (card.card.length == 0) more.remove();
				else Lampa.Activity.push(next);
			}, function(a, c) {
				Lampa.Noty.show(network.errorDecode(a, c));
			}, false, {
				dataType: 'text'
			});
			//	});
			body.append(more);
		};
		this.back = function() {
			last = items[0].render()[0];
			var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
			more.on('hover:focus', function(e) {
				if (object.page > 1) {
					Lampa.Activity.backward();
				} else {
					Lampa.Controller.toggle('head');
				}
			});
			body.prepend(more);
		};
		this.card = function(str) {
			var card = [];
			var page;
			if (object.sourc != 'pub') str = str.replace(/\n/g, '');
			if (object.card && object.card.source == 'rezka' || object.sourc == 'rezka') {
				var h = $('.b-content__inline_item', str).length ? $('.b-content__inline_item', str) : $('.b-content__collections_item', str);
				total_pages = $('.b-navigation', str).find('a:last-child').length;
				page = $('.b-navigation', str).find('a:last-child').attr('href');
				$(h).each(function(i, html) {
					card.push({
						id: $('a', html).attr('href').split('-')[0].split('/').pop(),
						title: $('a:eq(1)', html).text().split(' / ').shift() || $('.title', html).text(),
						title_org: $('a:eq(1)', html).text().split(' / ').shift(),
						url: $('a', html).attr('href'),
						img: $('img', html).attr('src'),
						quantity: $('.num', html).text() + ' видео',
						year: $('div:eq(2)', html).text().split(' - ').shift()
					});
				});
			} else if (object.card && object.card.source == 'filmix' || object.sourc == 'filmix') {
				var d = $('.playlist-articles', str);
				var str = d.length ? d.html() : $('.m-list-movie', str).html();
				$(str).each(function(i, html) {
					if (html.tagName == 'DIV') {
						page = $(html).find('.next').attr('href');
						total_pages = $(html).find('a:last-child').length;
					}
					if (html.tagName == 'ARTICLE') card.push({
						id: $('a', html).attr('href').split('-')[0].split('/').pop(),
						title: $('.m-movie-title', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').shift()),
						title_org: $('.m-movie-original', html).text() || $('.origin-name', html).text(),
						url: $('a', html).attr('href'),
						img: $('img', html).attr('src'),
						quantity: $('.m-movie-quantity', html).text() || $('.count', html).text(),
						year: $('.grid-item', html).text() || ($('.poster', html).attr('alt') && $('.poster', html).attr('alt').split(',').pop())
					});
				});
			} else if (object.card && object.card.source == 'pub' || object.sourc == 'pub') {
				str = JSON.parse(str);
				if (str.pagination) {
					total_pages = str.pagination.total + 1;
					page = str.pagination.current + 1;
				}
				if (str.items) str.items.forEach(function(element) {
					card.push({
						url: element.id,
						id: element.id,
						watch: element.views + '/' + element.watchers,
						title: element.title.split('/')[0],
						original_title: element.title.split('/')[1] || element.title,
						release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
						first_air_date: element.type && (element.type.match('serial|docuserial|tvshow') ? 'tv' : '') || '',
						vote_average: element.imdb_rating || 0,
						img: element.posters.big,
						year: element.year,
						years: element.years
					});
				});
			}
			return {
				card: card,
				page: page,
				total_pages: total_pages
			};
		};
		this.finds = function(element, find) {
			var finded;
			var filtred = function filtred(items) {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					if ((element.title_org == (item.original_title || item.original_name) || element.title == (item.title || item.name)) && (item.first_air_date || item.release_date) && parseInt(element.year) == (item.first_air_date || item.release_date).split('-').shift()) {
						finded = item;
						break;
					}
				}
			};
			if (find.movie && find.movie.results.length) filtred(find.movie.results);
			if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
			return finded;
		};
		this.start = function() {
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render(), info);
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');
					else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					Navigator.move('right');
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up');
					else Lampa.Controller.toggle('head');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
				},
				back: function back() {
					Lampa.Activity.backward();
				}
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			network.clear();
			Lampa.Arrays.destroy(items);
			scroll.destroy();
			html.remove();
			body.remove();
			network = null;
			items = null;
			html = null;
			body = null;
			info = null;
		};
	}

	function Radio_n(object) {
		var audio = new Audio();
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true,
			step: 250
		});
		var items = [];
		var html = $('<div></div>');
		var body = $('<div class="Radio_n category-full"></div>');
		var info;
		var last;
		var song;
		var playing = false;
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			network.silent(object.url.replace('api.', ''), this.build.bind(this), function() {
				var empty = new Lampa.Empty();
				html.append(empty.render());
				_this.start = empty.start;
				_this.activity.loader(false);
				_this.activity.toggle();
			});
			return this.render();
		};
		this.append = function(data) {
			var _this3 = this;
			var name = null;
			var playlist = [];
			data.forEach(function(element) {
				var url_song = element.video;
				var name_song = element.name;
				if (name == null) name = name_song, song = url_song;
				var card = Lampa.Template.get('card', {
					title: name_song,
					release_year: ''
				});
				playlist.push({
					title: name_song,
					url: url_song
				});
				card.addClass('card--radio');
				card.find('.card__img').css({
					'cursor': 'pointer',
					'background-color': '#353535a6'
				}).attr('src', element.picture ? element.picture : './img/welcome.jpg');
				card.on('hover:focus', function() {
					last = card[0];
					scroll.update(card, true);
					info.find('.info__title').text(name_song);
					info.find('.info__title-original').text(element.time + (element.quality ? ' / ' + element.quality : ''));
				});
				card.on('hover:enter', function() {
					//$(this).addClass('focus');
					$('.title_plaing').text(name_song);
					card.find('.card--category').addClass('focus');
					if (url_song.indexOf('.m3u8') !== -1) {
						var video = {
							title: name_song,
							url: url_song
						};
						Lampa.Player.play(video);
						Lampa.Player.playlist(playlist);
					} else _this3.Player(url_song);
				});
				body.append(card);
				items.push(card);
			});
			if (info.find('.title_plaing').text() == '') info.find('.title_plaing').text(name);
		};
		this.build = function(data) {
			var _this2 = this;
			Lampa.Background.change(API.replace('api.', '') + 'r/back.jpg');
			info = Lampa.Template.get('info_radio');
			info.find('#plbut').on('hover:enter hover:click', function() {
				_this2.Player(audio.src ? audio.src : song);
			});
			info.find('#stbut').on('hover:enter hover:click', function() {
				_this2.showStancia();
			});
			scroll.render().addClass('layer--wheight').data('mheight', info);
			html.append(info.append());
			html.append(scroll.render());
			this.append(data);
			scroll.append(body);
			this.activity.loader(false);
			this.activity.toggle();
		};
		this.showStancia = function() {
			var catalogs = [{
				title: 'Radio Record',
				url: API + 'r/record/'
			}, {
				title: 'Ukraine',
				url: API + 'r/ukraine/'
			}, {
				title: 'Russia',
				url: API + 'r/russia/'
			}, {
				title: 'Rock',
				url: API + 'r/rock/'
			}, {
				title: 'Dance',
				url: API + 'r/dance/'
			}, {
				title: 'Rap',
				url: API + 'r/rap/'
			}, {
				title: 'Background',
				url: API + 'r/fon/'
			}, {
				title: 'Jazz blues',
				url: API + 'r/jazz/'
			}];
			Lampa.Select.show({
				title: Lampa.Lang.translate('radio_style'),
				items: catalogs,
				onBack: function onBack() {
					Lampa.Controller.toggle('content');
				},
				onSelect: function onSelect(a) {
					Lampa.Activity.push({
						url: a.url.replace('api.', ''),
						title: a.title,
						component: 'Radio_n',
						page: 1
					});
				}
			});
		};
		this.Player = function(file) {
			if (audio.paused || (audio.src !== file || audio.src == null)) {
				audio.src = file;
				audio.play();
				info.find('.title_plaing').removeClass('blink2');
				info.find('#plbut').removeClass('play').addClass('pause');
			} else {
				audio.pause();
				info.find('.title_plaing').addClass('blink2');
				info.find('#plbut').removeClass('pause').addClass('play');
			}
		};
		this.start = function() {
			var _this = this;
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render(), info);
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');
					else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					if (Navigator.canmove('right')) Navigator.move('right');
					else _this.showStancia();
				},
				up: function up() {
					if (Navigator.canmove('up')) {
						Navigator.move('up');
					} else {
						if (!$('body').find('#stbut').hasClass('focus') && !$('body').find('#plbut').hasClass('focus')) {
							if (!$('body').find('#stbut').hasClass('focus')) {
								Lampa.Controller.collectionSet(info);
								Navigator.move('right');
							}
						} else Lampa.Controller.toggle('head');
					}
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
					else Lampa.Controller.toggle('content');
				},
				back: function back() {
					Lampa.Activity.backward();
				}
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {
			audio.pause();
		};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			audio.pause();
			network.clear();
			scroll.destroy();
			info.remove();
			html.remove();
			body.remove();
			audio = null;
			network = null;
			items = null;
			html = null;
			body = null;
			info = null;
		};
	}

	function startPlugin() {
		window.plugin_modss = true;
		Lampa.Component.add('forktv', forktv);
		Lampa.Component.add('Radio_n', Radio_n);
		Lampa.Component.add('modss_tv', modss_tv);
		Lampa.Component.add('modss_online', component);
		Lampa.Component.add('collection', collection);

		Lampa.Template.add('onlines_v1', "<div class='online onlines_v1 selector'><div class='online__body'><div style='position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em'><svg style='height: 2.4em; width:  2.4em;' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'>   <circle cx='64' cy='64' r='56' stroke='white' stroke-width='16'/>   <path d='M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z' fill='white'/></svg>  </div><div class='online__title' style='padding-left: 2.1em;'>{title}</div><div class='online__quality' style='padding-left: 3.4em;'>{quality}{info}</div> </div></div>");
		Lampa.Template.add('modss_online_css', "<style>@charset 'UTF-8';.full-start-new__buttons .full-start__button.view--modss_online span{display:block;} .online_modss__episode-number-season{font-size:1em;font-weight:700;color:#fff;position:absolute;top:.5em;right:.5em;background-color: rgba(0, 0, 0, 0.4);padding:0.2em;-webkit-border-radius: 0.3em;moz-border-radius: 0.3em;border-radius: 0.3em;} .online_modss{position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online_modss__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online_modss__body{padding:.8em 1.2em}}.online_modss__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online_modss__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online_modss__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online_modss__img{width:7em;min-height:6em}}.online_modss__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online_modss__folder>svg{width:4.4em!important;height:4.4em!important}.online_modss__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_modss__subtitle{position:absolute;bottom:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online_modss__viewed>svg, .online_modss__subtitle>svg{width:1.5em!important;height:1.5em!important;}.online_modss__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online_modss__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-moz-background-size:contain;-o-background-size:contain;background-size:contain}.online_modss__head,.online_modss__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__timeline{margin:.8em 0}.online_modss__timeline>.time-line{display:block !important}.online_modss__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online_modss__title{font-size:1.4em}}.online_modss__time{padding-left:2em}.online_modss__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online_modss__quality{padding-left:1em;white-space:nowrap}.online_modss__scan-file{position:absolute;bottom:0;left:0;right:0}.online_modss__scan-file .broadcast__scan{margin:0}.online_modss .online_modss-split{font-size:.8em;margin:0 1em;flex-shrink: 0;}.online_modss.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;-moz-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online_modss+.online_modss{margin-top:1.5em}.online_modss--folder .online_modss__footer{margin-top:.8em}.online_modss-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online_modss-rate>svg{width:1.3em!important;height:1.3em!important;}.online_modss-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em} .online-modss-watched{padding:1em}.online-modss-watched__icon>svg{width:1.5em!important;height:1.5em!important;}.online-modss-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-modss-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}   </style>");
		Lampa.Template.add('modss_online_full', "<div class=\"online_modss online_modss--full selector\"><div class=\"online_modss__img\">    <img alt=\"\">    <div class=\"online_modss__loader\"></div></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{serv} {time}</div>    </div><div class=\"online_modss__timeline\"></div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>        <div class=\"online_modss__quality\">{quality}</div>    </div></div>    </div>");
		Lampa.Template.add('modss_does_not_answer', "<div class=\"online-empty\"><div class=\"online-empty__title\">    {title}</div><div class=\"online-empty__time\">    #{modss_balanser_timeout}</div><div class=\"online-empty__buttons\">    <div class=\"online-empty__button selector cancel\">#{cancel}</div>    <div class=\"online-empty__button selector change\">#{modss_change_balanser}</div></div><div class=\"online-empty__templates\">    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div>    <div class=\"online-empty-template\">        <div class=\"online-empty-template__ico\"></div>        <div class=\"online-empty-template__body\"></div>    </div></div>    </div>");
		Lampa.Template.add('modss_online_rate', "<div class=\"online_modss-rate\"><svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">    <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path></svg><span>{rate}</span>    </div>");
		Lampa.Template.add('modss_online_folder', "<div class=\"online_modss online_modss--folder selector\"><div class=\"online_modss__folder\">    <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>        <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>        <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>    </svg></div><div class=\"online_modss__body\">    <div class=\"online_modss__head\">        <div class=\"online_modss__title\">{title}</div>        <div class=\"online_modss__time\">{time}</div>    </div><div class=\"online_modss__footer\">        <div class=\"online_modss__info\">{info}</div>    </div></div>    </div>");
		Lampa.Template.add('modss_online_watched', "<div class=\"online_modss online-modss-watched selector\"><div class=\"online-modss-watched__icon\">    <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>        <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>    </svg></div><div class=\"online-modss-watched__body\">    </div></div>");
		Lampa.Template.add('epg_modss', "<div class=\"notice notice--card selector layer--render image--loaded\"><div class=\"notice__left\"><div class=\"notice__img\"><img/></div></div> <div class=\"notice__body\"> <div class=\"notice__head\"><div class=\"notice__title\">{title}</div><div class=\"notice__time\">{time}</div></div><div class=\"notice__descr\">{descr}</div></div></div>");
		Lampa.Template.add('icon_subs', '<svg width=\"23\" height=\"25\" viewBox=\"0 0 23 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M22.4357 20.0861C20.1515 23.0732 16.5508 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C16.5508 0 20.1515 1.9268 22.4357 4.9139L18.8439 7.84254C17.2872 6.09824 15.0219 5 12.5 5C7.80558 5 5 7.80558 5 12.5C5 17.1944 7.80558 20 12.5 20C15.0219 20 17.2872 18.9018 18.8439 17.1575L22.4357 20.0861Z\" fill=\"currentColor\"/>\n</svg>');
		Lampa.Template.add('modss_style', "<style>.program-body .notice__left{width:15em!important;} .program-body .notice__img{padding-bottom: 57% !important;} @media screen and (max-width:2560px){.epg--img{width:10em;}}@media screen and (max-width:420px){.program-body .notice--card{display:block} .program-body .notice__left{float:left;width:32em!important}.program-body .notice__body{float:left;} .program-body .notice__img{padding-bottom: 56% !important;}} .mods_iptv__program{padding:0 1em}.iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}@media screen and (max-width: 585px) {.timeline{bottom:12em}.card--new_seria {right:2em!important;bottom:10em!important} .card--last_viewD{right:80%!important;top:2em!important}}</style>");

		Lampa.Template.add('hdgo_item', '<div class="selector hdgo-item"><div class="hdgo-item__imgbox"><img class="hdgo-item__img"/><div class="card__icons"><div class="card__icons-inner"></div></div></div><div class="hdgo-item__name">{title}</div></div>');
		Lampa.Template.add('hdgo_style', '<style>.last--focus .hdgo-item__imgbox::after {content: "";position: absolute;top: -0.4em;left: -0.4em;right: -0.4em;bottom: -0.4em;border: .3em solid red;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em;opacity: .4}.modss-channel__name {padding:20px;text-align: center;font-size: 1.2em}.forktv.focus .hdgo-item__imgbox::after, .modss__tv.focus .hdgo-item__imgbox::after {opacity: 1}.nuamtv {filter: blur(7px);}.nuamtv:hover, .nuamtv:action {filter: blur(0px);}.a-r.b{color:#fff;background: linear-gradient(to right, rgba(204,0,0,1) 0%,rgba(150,0,0,1) 100%);}.a-r.de{color:#fff;background: linear-gradient(to right, #ffbc54 0%,#ff5b55 100%);}.a-r.g{background: linear-gradient(to right, rgba(205,235,142,1) 0%,rgba(165,201,86,1) 100%);color: #12420D;}.card.home.focus .card__img {border-color: green!important;-webkit-box-shadow: 0 0 0 0.4em green!important;-moz-box-shadow: 0 0 0 0.4em green!important;box-shadow: 0 0 0 0.4em green!important;}@media screen and (max-width: 2560px) {.pc.hdgo.card--collection,.pc.card--collection{width:11em!important} .tv_tv{width:12.5%!important}.tv_tv_c{width:20%!important}.tv_pc{width:16.66%!important}.tv.hdgo.card--collection{width:10.3em!important} .tv.card--collection{width:14.2%!important}.tv.sort.card--collection{width:25%!important}.tv.sort.hdgo.card--collection{width:25%!important}  .sort.hdgo.card--collection .card__view {padding-bottom:25%!important} .tv.two.sort.card--collection .card__view {padding-bottom: 10%!important} .tv.two.sort.card--collection{height:20%!important;width:50%!important}.pc.card--category, .tv.card--category{width:14.28%}.nuam.card--collection{width:20%!important}}  @media screen and (max-width: 1380px) {.pc.card--collection,.mobile,.mobile_tv{width:16.6%!important} .tv_pc{width:14.28%!important} .tv_pc_c{width:14.28%!important} .tv_tv{width:14.28%!important} .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.sort.pc.card--collection{width:25%!important}.sort.hdgo.card--collection{width:25%!important} .sort.hdgo.card--collection .card__view {padding-bottom:40%!important} .two.sort.card--collection{width:50%!important} .pc.two.sort.card--collection .card__view {padding-bottom: 33%!important} .pc.card--category,.nuam.card--category{width:11.5em!important}}  @media screen and (max-width: 420px) {.pc.card--collection,.mobile{width:10.3em!important}.mobile_tv{width:33.3%!important}  .pc.hdgo.card--collection,.hdgo.card--collection{width:10em!important}.pc.card--category,.nuam.card--category{width:7.9em!important}.nuam.card--collection{width:33.3%!important}.sort.hdgo.card--collection .card__view {padding-bottom:60%!important}}   .searc.card--collection .card__view {padding-bottom: 5%!important}.searc.card--collection{width:100%!important}.searc.card--collection .card__img{height:100%!important;}.hdgo-item{margin:0 .3em;width:10.4em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.hdgo-item__imgbox{background-color:#3e3e3e;padding-bottom:60%;position:relative;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em}.hdgo-item__img{position:absolute;top:0;left:0;width:100%;height:100%}.hdgo-item__name{font-size:1.1em;margin-top:.8em}.hdgo-item.focus .hdgo-item__imgbox::after{content:"";display:block;position:absolute;left:-.4em;top:-.4em;right:-.4em;bottom:-.4em;-border: .2em solid red;opacity:.6;-webkit-border-radius: .8em;-moz-border-radius: .8em;border-radius: .8em}.hdgo-item +.hdgo-item{margin:0 .3em}.modss_tv .items-line + .items-line, .forktv .items-line + .items-line {margin-top:0!important;}</style>');
		Lampa.Template.add('mods_radio_style', "<style>.blink2{-webkit-animation:blink2 1.5s linear infinite;animation:blink2 1.5s linear infinite}@-webkit-keyframes blink2{100%{color:rgba(34,34,34,0)}}@keyframes blink2{100%{color:rgba(34,34,34,0)}}.controll,.controll *{box-sizing:content-box;letter-spacing:0;}.controll{position:relative;transition:.5s linear;border:.3em solid #fff;background-color:#fff;border-radius:50%;bottom:4.19em;float:right;right:0;padding:1.7em;width:.2em;height:.2em;white-space:nowrap;text-align:center;cursor:pointer}.controll.pause{background-color:#353434;border-color:#3b6531}.controll,.controll .but_left,.controll .but_right,.controll:before{display:inline-block}.controll.pause .but_left,.controll.pause .but_right{margin-left:-8px;margin-top:-8px;border-left:8px solid #fff;border-top:0 solid transparent;border-bottom:0 solid transparent;height:18px}.controll.pause .but_left{border-right:10px solid transparent}.controll.play .but_right{margin-left:-5px;margin-top:-9px;border-left:15px solid #525252;border-top:10px solid transparent;border-bottom:10px solid transparent}.controll:hover,.controll.focus{background-color:#fff}.controll.play.focus{border-color:#8a8a8a}.controll.focus .but_left,.controll.focus .but_right,.controll:hover .but_left,.controll:hover .but_right{border-left-color:#252525}.Radio_n .card__view {padding-bottom: 75%!important;}.stbut,.stbut *{box-sizing:content-box;letter-spacing:0}.title_plaing{position:absolute;text-align:center;width:15em;margin-top:-1.2em;font-size:1.1em}.stbut{transition:.5s linear;border:.15em solid #fbfbfb;background-color:#000;border-radius:4em;margin-top:1em;padding:0.3em 4em 0em 0.5em;font-size:2em;cursor:pointer;height:1.5em;max-width:4em}.stbut:hover, .stbut.focus{background-color:#edebef;color:#616060;border-color:#8e8e8e}</style>");
		Lampa.Template.add('info_radio', '<div style="height:8em" class="radio_r info layer--width"><div class="info__left"><div style="margin-top:25px" class="info__title"></div><div class="info__create"></div></div><div style="display:block" class="info__right"> <b class="title_plaing"></b>   <div id="stantion_filtr"><div id="stbut" class="stbut selector"><b>СТАНЦИИ</b></div></div>    <div id="player_radio"><div id="plbut" class="controll selector play"><span class="but_left"></span><span class="but_right"></span></div></div></div></div>');
		Lampa.Template.add('mods_iptv_details', '<div class="mods_iptv-details"><div class="mods_epg-load" style="display:none;margin-bottom:-2em;position:relative"><div class="broadcast__text">' + Lampa.Lang.translate('search_searching') + '</div><div class="broadcast__scan"><div></div></div></div><div class="mods_iptv__program"></div></div>');
		Lampa.Template.add('mods_iptv_list', "<div class=\"iptv-list layer--height\"><div class=\"iptv-list__ico\"><svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">        <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>        <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/><line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>        <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg></div><div class=\"iptv-list__title\">#{iptv_select_playlist}</div><div class=\"iptv-list__items\"></div></div>");

		/*
		var plugins = Lampa.Storage.get('plugins','[]');
		plugins.forEach(function(plug) {
			plug.url = (plug.url + '').replace('http://modss.online', 'http://lampa.stream/modss');
		});
		Lampa.Storage.set('plugins',plugins);
		*/

		manifest = {
			type: 'video',
			version: version_modss,
			name: "Онлайн - 🎃 HackMods 🏷️ v" + version_modss,
			description: 'Плагин для просмотра онлайн сериалов и фильмов',
			component: 'modss_online',
			onContextMenu: function onContextMenu(object) {
				return {
					name: Lampa.Lang.translate('online_watch'),
					description: ''
				};
			},
			onContextLauch: function onContextLauch(object) {
				Lampa.Activity.push({
					url: '',
					title: Lampa.Lang.translate('modss_title_online') + " - 🎃 HackMods 🏷️ v" + version_modss,
					component: 'modss_online',
					search: object.title,
					search_one: object.title,
					search_two: object.original_title,
					movie: object,
					page: 1
				});
			}
		};
		Lampa.Manifest.plugins = manifest;
		if (!Lampa.Lang) {
			var lang_data = {};
			Lampa.Lang = {
				add: function(data) {
					lang_data = data;
				},
				translate: function(key) {
					return lang_data[key] ? lang_data[key].ru : key;
				}
			}
		}
		Lampa.Lang.add({
			iptv_select_playlist: {
				ru: 'Выберите плейлист',
				uk: 'Виберіть плейлист',
				en: 'Choose a playlist'
			},
			iptv_add_fav: {
				ru: 'Добавить в избранное',
				uk: 'Додати в обране',
				en: 'Add to favourites'
			},
			iptv_remove_fav: {
				ru: 'Убрать из избранного',
				uk: 'Прибрати з вибраного',
				en: 'Remove from favorites'
			},
			iptv_later: {
				ru: 'Потом',
				uk: 'Потім',
				en: 'Later'
			},
			iptv_now: {
				ru: 'Сейчас на:',
				uk: 'Зараз на:',
				en: 'Now on:'
			},
			pub_sort_views: {
				ru: 'По просмотрам',
				uk: 'По переглядах',
				en: 'By views'
			},
			pub_sort_watchers: {
				ru: 'По подпискам',
				uk: 'За підписками',
				en: 'Subscriptions'
			},
			pub_sort_updated: {
				ru: 'По обновлению',
				uk: 'За оновленням',
				en: 'By update'
			},
			pub_sort_created: {
				ru: 'По дате добавления',
				uk: 'За датою додавання',
				en: 'By date added'
			},
			pub_search_coll: {
				ru: 'Поиск по подборкам',
				uk: 'Пошук по добіркам',
				en: 'Search by collections'
			},
			pub_title_all: {
				ru: 'Все',
				uk: 'Все',
				en: 'All'
			},
			pub_title_popular: {
				ru: 'Популярные',
				uk: 'Популярнi',
				en: 'Popular'
			},
			pub_title_new: {
				ru: 'Новые',
				uk: 'Новi',
				en: 'New'
			},
			pub_title_hot: {
				ru: 'Горячие',
				uk: 'Гарячi',
				en: 'Hot'
			},
			pub_title_fresh: {
				ru: 'Свежие',
				uk: 'Свiжi',
				en: 'Fresh'
			},
			pub_title_rating: {
				ru: 'Рейтинговые',
				uk: 'Рейтинговi',
				en: 'Rating'
			},
			pub_title_allingenre: {
				ru: 'Всё в жанре',
				uk: 'Все у жанрі',
				en: 'All in the genre'
			},
			pub_title_popularfilm: {
				ru: 'Популярные фильмы',
				uk: 'Популярні фільми',
				en: 'Popular movies'
			},
			pub_title_popularserial: {
				ru: 'Популярные сериалы',
				uk: 'Популярні сериали',
				en: 'Popular series'
			},
			pub_title_newfilm: {
				ru: 'Новые фильмы',
				uk: 'Новi фiльми',
				en: 'New movies'
			},
			pub_title_newserial: {
				ru: 'Новые сериалы',
				uk: 'Новi серiали',
				en: 'New series'
			},
			pub_title_newconcert: {
				ru: 'Новые концерты',
				uk: 'Новi концерти',
				en: 'New concerts'
			},
			pub_title_newdocfilm: {
				ru: 'Новые док. фильмы',
				uk: 'Новi док. фiльми',
				en: 'New document movies'
			},
			pub_title_newdocserial: {
				ru: 'Новые док. сериалы',
				uk: 'Новi док. серiали',
				en: 'New document series'
			},
			pub_title_newtvshow: {
				ru: 'Новое ТВ шоу',
				uk: 'Нове ТБ шоу',
				en: 'New TV show'
			},
			pub_modal_title: {
				ru: '1. Авторизируйтесь на сайте: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2. В поле "Активация устройства" введите код.',
				uk: '1. Авторизуйтесь на сайті: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Введіть код у полі "Активація пристрою".',
				en: '1. Log in to the site: <a style="color:#fff" href="#">https://kino.pub/device</a><br>2.  Enter the code in the "Device activation" field.'
			},
			pub_title_wait: {
				ru: 'Ожидание идентификации кода',
				uk: 'Очікування ідентифікації коду',
				en: 'Waiting for code identification'
			},
			pub_title_left_days: {
				ru: 'Осталось: ',
				uk: 'Залишилось: ',
				en: 'Left days: '
			},
			pub_title_left_days_d: {
				ru: 'дн.',
				uk: 'дн.',
				en: 'd.'
			},
			pub_title_regdate: {
				ru: 'Дата регистрации:',
				uk: 'Дата реєстрації:',
				en: 'Date of registration:'
			},
			pub_date_end_pro: {
				ru: 'ПРО заканчивается:',
				uk: 'ПРО закінчується:',
				en: 'PRO ends:'
			},
			pub_auth_add_descr: {
				ru: 'Добавить в свой профиль устройство',
				uk: 'Додати у свій профіль пристрій',
				en: 'Add a device to your profile'
			},
			pub_title_not_pro: {
				ru: 'ПРО не активирован',
				uk: 'ПРО не активований',
				en: 'PRO is not activated'
			},
			pub_device_dell_noty: {
				ru: 'Устройство успешно удалено',
				uk: 'Пристрій успішно видалено',
				en: 'Device deleted successfully'
			},
			pub_device_title_options: {
				ru: 'Настройки устройства',
				uk: 'Налаштування пристрою',
				en: 'Device Settings'
			},
			pub_device_options_edited: {
				ru: 'Настройки устройства изменены',
				uk: 'Установки пристрою змінено',
				en: 'Device settings changed'
			},
			params_pub_clean_tocken: {
				ru: 'Очистить токен',
				uk: 'Очистити токен',
				en: 'Clear token'
			},
			saved_collections_clears: {
				ru: 'Сохранённые подборки очищены',
				uk: 'Збірки очищені',
				en: 'Saved collections cleared'
			},
			card_my_clear: {
				ru: 'Убрать с моих подборок',
				uk: 'Прибрати з моїх добірок',
				en: 'Remove from my collections'
			},
			card_my_add: {
				ru: 'Добавить в мои подборки',
				uk: 'Додати до моїх добірок',
				en: 'Add to my collections'
			},
			card_my_descr: {
				ru: 'Смотрите в меню (Подборки)',
				uk: 'Дивитесь в меню (Підбірки)',
				en: 'Look in the menu (Collections)'
			},
			card_my_clear_all: {
				ru: 'Удалить всё',
				uk: 'Видалити все',
				en: 'Delete all'
			},
			card_my_clear_all_descr: {
				ru: 'Очистит все сохранённые подборки',
				uk: 'Очистити всі збережені збірки',
				en: 'Clear all saved selections'
			},
			radio_style: {
				ru: 'Стиль',
				uk: 'Стиль',
				en: 'Style'
			},
			title_on_the: {
				ru: 'на',
				uk: 'на',
				en: 'on'
			},
			title_my_collections: {
				ru: 'Мои подборки',
				uk: 'Мої добiрки',
				en: 'My collections'
			},
			modss_watch: {
				ru: 'Смотреть онлайн',
				en: 'Watch online',
				ua: 'Дивитися онлайн',
				zh: '在线观看'
			},
			online_no_watch_history: {
				ru: 'Нет истории просмотра',
				en: 'No browsing history',
				ua: 'Немає історії перегляду',
				zh: '没有浏览历史'
			},
			modss_video: {
				ru: 'Видео',
				en: 'Video',
				ua: 'Відео',
				zh: '视频'
			},
			modss_nolink: {
				ru: 'Не удалось извлечь ссылку',
				uk: 'Неможливо отримати посилання',
				en: 'Failed to fetch link'
			},
			modss_waitlink: {
				ru: 'Работаем над извлечением ссылки, подождите...',
				uk: 'Працюємо над отриманням посилання, зачекайте...',
				be: 'Працуем над выманнем спасылкі, пачакайце...',
				en: 'Working on extracting the link, please wait...',
				zh: '正在提取链接，请稍候...'
			},
			modss_viewed: {
				ru: 'Просмотрено',
				uk: 'Переглянуто',
				en: 'Viewed'
			},
			modss_balanser: {
				ru: 'Балансер',
				uk: 'Балансер',
				en: 'Balancer'
			},
			helper_online_file: {
				ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
				uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
				en: 'Hold the "OK" key to bring up the context menu'
			},
			filter_series_order: {
				ru: 'Порядок серий',
				uk: 'Порядок серій',
				en: 'Series order'
			},
			filter_video_stream: {
				ru: 'Видео поток',
				uk: 'Відео потік',
				en: 'Video stream'
			},
			filter_video_codec: {
				ru: 'Кодек',
				uk: 'Кодек',
				en: 'Codec'
			},
			filter_video_server: {
				ru: 'Сервер',
				uk: 'Сервер',
				en: 'Server'
			},
			modss_title_online: {
				ru: 'Онлайн',
				uk: 'Онлайн',
				en: 'Online'
			},
			modss_change_balanser: {
				ru: 'Изменить балансер',
				uk: 'Змінити балансер',
				en: 'Change balancer',
				zh: '更改平衡器'
			},
			modss_clear_all_marks: {
				ru: 'Очистить все метки',
				uk: 'Очистити всі мітки',
				en: 'Clear all labels',
				zh: '清除所有标签'
			},
			modss_clear_all_timecodes: {
				ru: 'Очистить все тайм-коды',
				uk: 'Очистити всі тайм-коди',
				en: 'Clear all timecodes',
				zh: '清除所有时间代码'
			},
			modss_title_clear_all_mark: {
				ru: 'Снять отметку у всех',
				uk: 'Зняти відмітку у всіх',
				en: 'Unmark all'
			},
			modss_title_clear_all_timecode: {
				ru: 'Сбросить тайм-код у всех',
				uk: 'Скинути тайм-код у всіх',
				en: 'Reset timecode for all'
			},
			modss_title_links: {
				ru: 'Качество',
				uk: 'Якість',
				en: 'Quality'
			},
			title_proxy: {
				ru: 'Прокси',
				uk: 'Проксі',
				en: 'Proxy'
			},
			online_proxy_title: {
				ru: 'Личный прокси',
				uk: 'Особистий проксі',
				en: 'Your proxy'
			},
			online_proxy_title_descr: {
				ru: 'Если балансер недоступен или не отвечает, требуется в выбранном Вами балансере "Включить" прокси, или указать ссылку на "Свой URL"',
				uk: 'Якщо балансер недоступний або не відповідає, потрібно у вибраному Вами балансері "Увімкнути" проксі, або вказати посилання на "Свій URL"',
				en: 'If the balancer is not available or does not respond, you need to "Enable" the proxy in the balancer you have chosen, or specify a link to "Custom URL"'
			},
			online_proxy_title_main: {
				ru: 'Встроенный прокси',
				uk: 'Вбудований проксі',
				en: 'Built-in proxy'
			},
			online_proxy_title_main_descr: {
				ru: 'Позволяет использовать встроенный в систему прокси для всех балансеров',
				uk: 'Дозволяє використовувати вбудований у систему проксі для всіх балансерів',
				en: 'Allows you to use the built-in proxy for all balancers'
			},
			online_proxy_descr: {
				ru: 'Позволяет задать личный прокси для всех балансеров',
				uk: 'Дозволяє встановити особистий проксі для всіх балансерів',
				en: 'Allows you to set a personal proxy for all balancers'
			},
			online_proxy_placeholder: {
				ru: 'Например: http://proxy.com',
				uk: 'Наприклад: http://proxy.com',
				en: 'For example: http://proxy.com'
			},
			online_proxy_url: {
				ru: 'Свой URL',
				uk: 'Свiй URL',
				en: 'Mine URL'
			},
			modss_voice_subscribe: {
				ru: 'Подписаться на перевод',
				uk: 'Підписатися на переклад',
				en: 'Subscribe to translation'
			},
			modss_voice_success: {
				ru: 'Вы успешно подписались',
				uk: 'Ви успішно підписалися',
				en: 'You have successfully subscribed'
			},
			modss_voice_error: {
				ru: 'Возникла ошибка',
				uk: 'Виникла помилка',
				en: 'An error has occurred'
			},
			modss_balanser_dont_work: {
				ru: 'Балансер ({balanser}) не отвечает на запрос.',
				uk: 'Балансер ({balanser}) не відповідає на запит.',
				en: 'Balancer ({balanser}) does not respond to the request.',
				zh: '平衡器（{balanser}）未响应请求。'
			},
			modss_balanser_timeout: {
				ru: 'Балансер будет переключен автоматически через <span class="timeout">10</span> секунд.',
				uk: 'Балансер буде переключено автоматично через <span class="timeout">10</span> секунд.',
				en: 'Balancer will be switched automatically in <span class="timeout">10</span> seconds.',
				zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。'
			},
			modss_does_not_answer_text: {
				ru: 'Сервер не отвечает на запрос.',
				uk: 'Сервер не відповідає на запит.',
				en: 'Server does not respond to the request.',
				zh: '服务器未响应请求。'
			},
			modss_balanser_dont_work_from: {
				ru: ' на балансере <b>{balanser}</b>',
				uk: ' на балансері <b>{balanser}</b>',
				en: ' на балансере <b>{balanser}</b>',
			},
			online_dash: {
				ru: 'Предпочитать DASH вместо HLS',
				uk: 'Віддавати перевагу DASH замість HLS',
				be: 'Аддаваць перавагу DASH замест HLS',
				en: 'Prefer DASH over HLS',
				zh: '比 HLS 更喜欢 DASH'
			},
			online_query_start: {
				ru: 'По запросу',
				uk: 'На запит',
				en: 'On request'
			},
			online_query_end: {
				ru: 'нет результатов',
				uk: 'немає результатів',
				en: 'no results'
			},
			title_online_continue: {
				ru: 'Продолжить',
				uk: 'Продовжити',
				en: 'Continue'
			},
			title_kb_captcha_address: {
				ru: 'Требуется пройти капчу по адресу: ',
				uk: 'Потрібно пройти капчу за адресою: ',
				en: 'It is required to pass the captcha at: ',
			},
			title_online_first_but: {
				ru: 'Кнопка онлайн всегда первая',
				uk: 'Кнопка онлайн завжди перша',
				en: 'Online button always first'
			},
			title_online_continued: {
				ru: 'Продолжить просмотр',
				uk: 'Продовжити перегляд',
				en: 'Continue browsing'
			},
			title_online_descr: {
				ru: 'Позволяет запускать плеер сразу на том месте, где остановили просмотр. Работает только в ВСТРОЕННОМ плеере.',
				uk: 'Дозволяє запускати плеєр одразу на тому місці, де зупинили перегляд.  Працює тільки у Вбудованому плеєрі.',
				en: 'Allows you to start the player immediately at the place where you stopped browsing.  Works only in the INTEGRATED player.'
			},
			title_online_hevc: {
				ru: 'Включить поддержку HDR',
				uk: 'Включити підтримку HDR',
				en: 'Enable HDR Support',
			},
			title_online__hevc_descr: {
				ru: 'Использовать HEVC / HDR если он доступен',
				uk: 'Використовувати HEVC / HDR якщо він доступний',
				en: 'Use HEVC / HDR if available',
			},
			title_prioriry_balanser: {
				ru: 'Балансер по умолчанию',
				uk: 'Балансер за замовчуванням',
				en: 'Default balancer',
			},
			title_prioriry_balanser_descr: {
				ru: 'Балансер фильмов по умолчанию',
				uk: 'Джерело фільмів за замовчуванням',
				en: 'Default movie source',
			},
			filmix_param_add_title: {
				ru: 'Добавить ТОКЕН от Filmix',
				uk: 'Додати ТОКЕН від Filmix',
				en: 'Add TOKEN from Filmix'
			},
			filmix_param_add_descr: {
				ru: 'Добавьте ТОКЕН для подключения подписки',
				uk: 'Додайте ТОКЕН для підключення передплати',
				en: 'Add a TOKEN to connect a subscription'
			},
			filmix_param_placeholder: {
				ru: 'Например: nxjekeb57385b..',
				uk: 'Наприклад: nxjekeb57385b..',
				en: 'For example: nxjekeb57385b..'
			},
			filmix_params_add_device: {
				ru: 'Добавить устройство на ',
				uk: 'Додати пристрій на ',
				en: 'Add Device to '
			},
			filmix_modal_text: {
				ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
				uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
				en: 'Enter it at https://filmix.ac/consoles in your authorized account!'
			},
			filmix_modal_wait: {
				ru: 'Ожидаем код',
				uk: 'Очікуємо код',
				en: 'Waiting for the code'
			},
			filmix_copy_secuses: {
				ru: 'Код скопирован в буфер обмена',
				uk: 'Код скопійовано в буфер обміну',
				en: 'Code copied to clipboard'
			},
			filmix_copy_fail: {
				ru: 'Ошибка при копировании',
				uk: 'Помилка при копіюванні',
				en: 'Copy error'
			},
			filmix_nodevice: {
				ru: 'Устройство не авторизовано',
				uk: 'Пристрій не авторизований',
				en: 'Device not authorized'
			},
			filmix_auth_onl: {
				ru: 'Для просмотра в качестве 720p нужно добавить устройство в свой аккаунт на сайте filmix иначе будет заставка на видео.<br><br>Перейти в настройки и добавить?',
				uk: 'Для перегляду в якостi 720p потрібно додати пристрій до свого облікового запису на сайті filmix інакше буде заставка на відео.<br><br>Перейти до налаштувань і додати?',
				en: 'To view in 720p quality, you need to add a device to your account on the filmix website, otherwise there will be a splash screen on the video.<br><br>Go to settings and add?'
			},
			fork_auth_modal_title: {
				ru: '1. Авторизируйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потребуется оформить подписку<br>3. В поле "Ваш ID/MAC" добавьте код',
				uk: '1. Авторизуйтесь на: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Потрібно оформити передплату<br>3. У полі "Ваш ID/MAC" додайте код',
				en: '1. Log in to: <a style="color:#fff" href="#">http://forktv.me</a><br>2. Subscription required<br>3. In the "Your ID / MAC" field, add the code'
			},
			fork_modal_wait: {
				ru: '<b style="font-size:1em">Ожидание идентификации кода</b><hr>После завершения идентификации произойдет перенаправление в обновленный раздел ForkTV',
				uk: '<b style="font-size:1em">Очiкуемо ідентифікації коду</b><hr>Після завершення ідентифікації відбудеться перенаправлення в оновлений розділ ForkTV',
				en: '<b style="font-size:1em">Waiting for code identification</b><hr>After identification is completed, you will be redirected to the updated ForkTV section'
			},
			title_status: {
				ru: 'Статус',
				uk: 'Статус',
				en: 'Status'
			},
			season_ended: {
				ru: 'сезон завершён',
				uk: 'сезон завершено',
				en: 'season ended'
			},
			season_from: {
				ru: 'из',
				uk: 'з',
				en: 'from'
			},
			season_new: {
				ru: 'Новая',
				uk: 'Нова',
				en: 'New'
			},
			info_attention: {
				ru: 'Внимание',
				uk: 'Увага',
				en: 'Attention'
			},
			info_pub_descr: {
				ru: '<b>KinoPub</b> платный ресурс, просмотр онлайн с балансера, а так же спортивные ТВ каналы будут доступны после покупки <b>PRO</b> в аккаунте на сайте',
				uk: '<b>KinoPub</b> платний ресурс, перегляд онлайн з балансера, а також спортивні ТБ канали будуть доступні після покупки <b>PRO</b> в обліковому записі на сайті',
				en: '<b>KinoPub</b> a paid resource, online viewing from a balancer, as well as sports TV channels will be available after purchasing <b>PRO</b> in your account on the site'
			},
			info_filmix_descr: {
				ru: 'Максимально доступное качество для просмотра без подписки - 720p. Для того, чтобы смотреть фильмы и сериалы в качестве - 1080р-2160р требуется подписка <b>PRO</b> или <b>PRO-PLUS</b> на сайте',
				uk: 'Максимально доступна якість для перегляду без підписки – 720p.  Для того, щоб дивитися фільми та серіали як - 1080р-2160р потрібна підписка <b>PRO</b> або <b>PRO-PLUS</b> на сайтi',
				en: 'The maximum available quality for viewing without a subscription is 720p.  In order to watch movies and series in quality - 1080p-2160p, you need a <b>PRO</b> or <b>PRO-PLUS</b> subscription to the site'
			},
			params_pub_on: {
				ru: 'Включить',
				uk: 'Увiмкнути',
				en: 'Enable'
			},
			params_pub_off: {
				ru: 'Выключить',
				uk: 'Вимкнути',
				en: 'Disable'
			},
			params_pub_on_descr: {
				ru: 'Отображает источник "<b>KinoPub</b>", а так же подборки. Для просмотра с балансера, а так же ТВ спорт каналов <span style="color:#ffd402">требуется подписка<span>',
				uk: 'Відображає джерело "<b>KinoPub</b>", а також добірки.  Для перегляду з балансера, а також ТБ спорт каналів <span style="color:#ffd402">потрібна підписка<span>',
				en: 'Displays the "<b>KinoPub</b>" source as well as collections.  To view from the balancer, as well as TV sports channels <span style="color:#ffd402">subscription<span> is required'
			},
			params_pub_add_source: {
				ru: 'Установить источник',
				uk: 'Встановити джерело',
				en: 'Set source'
			},
			pub_source_add_noty: {
				ru: 'KinoPub установлен источником по умолчанию',
				uk: 'KinoPub встановлений стандартним джерелом',
				en: 'KinoPub set as default source'
			},
			descr_pub_settings: {
				ru: 'Настройки сервера, типа потока...',
				uk: 'Налаштування сервера типу потоку...',
				en: 'Server settings, stream type...'
			},
			params_pub_add_source_descr: {
				ru: 'Установить источник по умолчанию на KinoPub',
				uk: 'Встановити стандартне джерело на KinoPub',
				en: 'Set Default Source to KinoPub'
			},
			params_pub_update_tocken: {
				ru: 'Обновить токен',
				uk: 'Оновити токен',
				en: 'Update token'
			},
			params_pub_dell_device: {
				ru: 'Удалить привязку устройства',
				uk: 'Видалити прив\'язку пристрою',
				en: 'Remove device link'
			},
			params_pub_dell_descr: {
				ru: 'Будет удалено устройство с прывязаных устройств в аккаунте',
				uk: 'Буде видалено пристрій із прив\'язаних пристроїв в обліковому записі',
				en: 'The device will be removed from linked devices in the account'
			},
			params_radio_enable: {
				ru: 'Включить радио',
				uk: 'Увiмкнути радiо',
				en: 'Enable radio'
			},
			params_radio_enable_descr: {
				ru: 'Отображает пункт "Радио" в главном меню с популярными радио-станциями',
				uk: 'Відображає пункт "Радіо" в головному меню з популярними радіостанціями',
				en: 'Displays the item "Radio" in the main menu with popular radio stations'
			},
			params_tv_enable: {
				ru: 'Включить ТВ',
				uk: 'Увiмкнути ТВ',
				en: 'Enable TV'
			},
			params_tv_enable_descr: {
				ru: 'Отображает пункт "Modss-TV" в главном меню с популярными каналами',
				uk: 'Відображає пункт "Modss-TV" в головному меню з популярними каналами',
				en: 'Displays the item "Modss-TV" in the main menu with popular channels'
			},
			params_collections_descr: {
				ru: 'Добавляет в пункт "Подборки" популярные разделы, такие как Rezka, Filmix, KinoPub',
				uk: 'Додає до пункту "Підбірки" популярні розділи, такі як Rezka, Filmix, KinoPub',
				en: 'Adds to "Collections" popular sections such as Rezka, Filmix, KinoPub'
			},
			params_styles_title: {
				ru: 'Стилизация',
				uk: 'Стилізація',
				en: 'Stylization'
			},
			placeholder_password: {
				ru: 'Введите пароль',
				uk: 'Введіть пароль',
				en: 'Enter password'
			},
			title_parent_contr: {
				ru: 'Родительский контроль',
				uk: 'Батьківський контроль',
				en: 'Parental control'
			},
			title_addons: {
				ru: 'Дополнения',
				uk: 'Додатки',
				en: 'Add-ons'
			},
			onl_enable_descr: {
				ru: 'Позволяет просматривать фильмы, сериалы в режиме Stream',
				uk: 'Дозволяє переглядати фільми, серіали в режимі Stream',
				en: 'Allows you to watch movies, series in Stream mode'
			},
			fork_enable_descr: {
				ru: 'Отображает пункт <b>"ForkTV"</b> в главном меню с популярными источниками, торрентами',
				uk: 'Відображає пункт <b>"ForkTV"</b> у головному меню з популярними джерелами, торрентами',
				en: 'Displays <b>"ForkTV"</b> item in main menu with popular sources, torrents'
			},
			title_fork_edit_cats: {
				ru: 'Изменить разделы',
				uk: 'Змінити розділи',
				en: 'Edit Sections'
			},
			title_fork_add_cats: {
				ru: 'Добавить разделы',
				uk: 'Додати розділи',
				en: 'Add Sections'
			},
			title_fork_clear: {
				ru: 'Очистить разделы',
				uk: 'Очистити розділи',
				en: 'Clear Sections'
			},
			title_fork_clear_descr: {
				ru: 'Будет выполнена очистка всех выбранных разделов',
				uk: 'Буде виконано очищення всіх вибраних розділів',
				en: 'All selected partitions will be cleared'
			},
			title_fork_clear_noty: {
				ru: 'Разделы успешно очищены',
				uk: 'Розділи успішно очищені',
				en: 'Partitions cleared successfully'
			},
			title_fork_reload_code: {
				ru: 'Обновить код',
				uk: 'Оновити код',
				en: 'Update Code'
			},
			title_fork_current: {
				ru: 'Текущий',
				uk: 'Поточний',
				en: 'Current'
			},
			title_fork_new: {
				ru: 'Новый',
				uk: 'Новий',
				en: 'New'
			},
			title_tv_clear_fav: {
				ru: 'Очистить избранное',
				uk: 'Очистити вибране',
				en: 'Clear Favorites'
			},
			title_tv_clear__fav_descr: {
				ru: 'Будет выполнена очистка избранных каналов',
				uk: 'Буде виконано очищення обраних каналів',
				en: 'Favorite channels will be cleared'
			},
			title_tv_clear_fav_noty: {
				ru: 'Все избранные каналы удалены',
				uk: 'Усі вибрані канали видалені',
				en: 'All favorite channels have been deleted'
			},
			succes_update_noty: {
				ru: 'успешно обновлён',
				uk: 'успішно оновлено',
				en: 'successfully updated'
			},
			title_enable_rating: {
				ru: 'Включить рейтинг',
				uk: 'Увiмкнути рейтинг',
				en: 'Enable rating'
			},
			title_enable_rating_descr: {
				ru: 'Отображает в карточке рейтинг Кинопоиск и IMDB',
				uk: 'Відображає у картці рейтинг Кінопошук та IMDB',
				en: 'Displays the Kinopoisk and IMDB rating in the card'
			},
			title_info_serial: {
				ru: 'Информация о карточке',
				uk: 'Інформація про картку',
				en: 'Card Information'
			},
			title_info_serial_descr: {
				ru: 'Отображает информацию о количестве серий в карточке, в том числе последнею серию на постере',
				uk: 'Відображає інформацію про кількість серій у картці, у тому числі останню серію на постері',
				en: 'Displays information about the number of episodes in the card, including the last episode on the poster'
			},
			title_add_butback: {
				ru: 'Включить кнопку "Назад"',
				uk: 'Увiмкнути кнопку "Назад"',
				en: 'Enable back button'
			},
			title_add_butback_descr: {
				ru: 'Отображает внешнюю кнопку "Назад" для удобной навигации в полноэкраном режиме на различных смартфона',
				uk: 'Відображає зовнішню кнопку "Назад" для зручної навігації в повноекранному режимі на різних смартфонах',
				en: 'Displays an external back button for easy full-screen navigation on various smartphones'
			},
			title_butback_pos: {
				ru: 'Положение кнопки "Назад"',
				uk: 'Розташування кнопки "Назад"',
				en: 'Back button position'
			},
			buttback_right: {
				ru: 'Справа',
				uk: 'Праворуч',
				en: 'Right'
			},
			buttback_left: {
				ru: 'Слева',
				uk: 'Лiворуч',
				en: 'Left'
			},
			title_close_app: {
				ru: 'Закрыть приложение',
				uk: 'Закрити додаток',
				en: 'Close application'
			},
			title_radio: {
				ru: 'Радио',
				uk: 'Радiо',
				en: 'Radio'
			}
		});

		function FreeJaketOpt() {
			Lampa.Arrays.getKeys(Modss.jack).map(function(el) {
				jackets[el] = el.replace(/_/g, '.');
			});
			var params = Lampa.SettingsApi.getParam('parser')
			if (params) {
				var param = params.find(function(p) {
					return p.param.name == 'jackett_url2';
				});
				if (param) Lampa.Arrays.remove(params, param);
			}
			Lampa.SettingsApi.addParam({
				component: 'parser',
				param: {
					name: 'jackett_url2',
					type: 'select',
					values: jackets,
					default: 'jacred_ru'
				},
				field: {
					name: 'Публичные JACKett Ⓜ️',
					description: 'Обновится после выхода из настроек'
				},
				onChange: function(value) {
					Lampa.Storage.set('jackett_url', Modss.jack[value].url);
					Lampa.Storage.set('jackett_key', Modss.jack[value].key);
					Lampa.Storage.set('jackett_interview', Modss.jack[value].interv);
					Lampa.Storage.set('parse_in_search', false);
					Lampa.Storage.set('parse_lang', Modss.jack[value].lang);
					Lampa.Settings.update();
				},
				onRender: function(item) {
					setTimeout(function() {
						$('div[data-children="parser"]').on('hover:enter', function() {
							Lampa.Settings.update();
						});
						if (!API || !API.length) window.location.reload();
						$('[data-name="jackett_url2"]').on('hover:enter', function(el) {
							Lampa.Select.render().find('.selectbox-item__title').map(function(i, item) {
								Modss.check($(item).text().toLowerCase().replace(/\./g, '_'), function(e) {
									$(item).css('color', e ? '#23ff00' : '#d10000');
								});
							});
						});
						if (Lampa.Storage.field('parser_use')) {
							item.show();
							if (Boolean(Modss.jack[Lampa.Storage.get('jackett_url2')])) $('.settings-param__name', item).before('<div class="settings-param__status one ' + (Modss.jack[Lampa.Storage.get('jackett_url2')].ok ? "active" : "error") + '"></div>');
							$('[data-name="jackett_url"] .settings-param__name').before('<div class="settings-param__status wait act"></div>');
							$('.settings-param__name', item).css('color', '#f3d900');
							$('div[data-name="jackett_url2"]').insertAfter('div[data-children="parser"]');
							Modss.check($('.settings-param__value', item).text().toLowerCase().replace(/\./g, '_'), function(e) {
								Modss.check(Lampa.Storage.get('jackett_url'));
								$($('.settings-param__status', item)).removeClass('active error wait').addClass(e ? 'active' : 'error');
							});
						} else item.hide();
					}, 50);
				}
			});
		}
		Lampa.Listener.follow('full', function(e) {
			if (e.type == 'complite') {
				cards = e.data.movie;
				Modss.serialInfo(e.data.movie);
				Modss.online();
				Modss.rating_kp_imdb(e.data.movie).then(function(e) {
					Modss.preload();
				})['catch'](function(e) {
					{
						START_PRELOAD
					}
				});
				$('.view--torrent').addClass('selector').empty().append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"/></svg><span>' + Lampa.Lang.translate('full_torrents') + '</span>');
				$('.view--trailer').empty().append("<svg enable-background='new 0 0 512 512' id='Layer_1' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path fill='currentColor' d='M260.4,449c-57.1-1.8-111.4-3.2-165.7-5.3c-11.7-0.5-23.6-2.3-35-5c-21.4-5-36.2-17.9-43.8-39c-6.1-17-8.3-34.5-9.9-52.3   C2.5,305.6,2.5,263.8,4.2,222c1-23.6,1.6-47.4,7.9-70.3c3.8-13.7,8.4-27.1,19.5-37c11.7-10.5,25.4-16.8,41-17.5   c42.8-2.1,85.5-4.7,128.3-5.1c57.6-0.6,115.3,0.2,172.9,1.3c24.9,0.5,50,1.8,74.7,5c22.6,3,39.5,15.6,48.5,37.6   c6.9,16.9,9.5,34.6,11,52.6c3.9,45.1,4,90.2,1.8,135.3c-1.1,22.9-2.2,45.9-8.7,68.2c-7.4,25.6-23.1,42.5-49.3,48.3   c-10.2,2.2-20.8,3-31.2,3.4C366.2,445.7,311.9,447.4,260.4,449z M205.1,335.3c45.6-23.6,90.7-47,136.7-70.9   c-45.9-24-91-47.5-136.7-71.4C205.1,240.7,205.1,287.6,205.1,335.3z'/></g></svg><span>" + Lampa.Lang.translate('full_trailers') + "</span>");
			}
		});
		Lampa.Listener.follow('activity', function(e) {
			if (e.component == 'full' && e.type == 'start') {
				var button = Lampa.Activity.active().activity.render().find('.view--modss_online');
				if (button.length) {
					cards = e.object.card;
					Modss.online(button);
					Modss.last_view(e.object.card);
				}
			}
		});
		Lampa.Storage.listener.follow('change', function(e) {
			//if(e.name == 'jackett_key' || e.name == 'jackett_url') Modss.check(e.value);
		});
		Lampa.Settings.listener.follow('open', function(e) {
			if (e.name == 'main') {
				if (Lampa.Settings.main().render().find('[data-component="pub_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'pub_param',
						name: 'KinoPub',
						icon: '<svg viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="fork_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'fork_param',
						name: 'ForkTV',
						icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="rezka_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'rezka_param',
						name: 'HDRezka',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="filmix_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'filmix_param',
						name: 'Filmix',
						icon: '<svg height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_tv_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_tv_param',
						name: 'Modss-TV',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				if (Lampa.Settings.main().render().find('[data-component="modss_online_param"]').length == 0) {
					Lampa.SettingsApi.addComponent({
						component: 'modss_online_param',
						name: 'Modss-Online',
						icon: '<svg height="57px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#fff" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>'
					});
				}
				Lampa.Settings.main().update();
				Lampa.Settings.main().render().find('[data-component="modss_online_param"], [data-component="filmix"], [data-component="rezka_param"], [data-component="pub_param"], [data-component="filmix_param"], [data-component="fork_param"], [data-component="modss_tv_param"]').addClass('hide');
			}
			if (e.name == 'mods_proxy') {
				$('.settings__title').text(Lampa.Lang.translate('title_proxy') + " 🎃 HackMods 🏷️");
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{online_proxy_title_descr}</div>', '</div>', '</div>'].join('');
				e.body.find('[data-name="mods_proxy_all"]').before(Lampa.Lang.translate(ads));
			} else $('.settings__title').text(Lampa.Lang.translate('menu_settings'));
			if (e.name == 'fork_param') $('.settings__title').append(" ForkTV");
			if (e.name == 'filmix_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_filmix_descr} <span style="color: #24b4f9">filmix.ac</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" Filmix");
			}
			if (e.name == 'pub_param') {
				var ads = ['<div style="padding: 1.5em 2em; padding-top: 10px;">', '<div style="background: #3e3e3e; padding: 1em; border-radius: 0.3em;">', '<div style="font-size: 1em; margin-bottom: 1em; color: #ffd402;">#{info_attention} ⚠</div>', '<div style="line-height: 1.4;">#{info_pub_descr} <span style="color: #24b4f9">kino.pub</span></div>', '</div>', '</div>'].join('');
				e.body.find('[data-static="true"]:eq(0)').after(Lampa.Lang.translate(ads));
				$('.settings__title').append(" KinoPub");
			}
			if (e.name == 'modss_online_param') {
				$('.settings__title').text("🎃 HackMods 🏷️ Online");
				var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
				title.text(title.text().split('<').shift());
			}
			if (e.name == 'settings_modss') {
				$('.settings__title').text("🎃 HackMods 🏷️ 💎");
				var title = $('[data-name="priority_balanser"] .settings-param__value', e.body);
				title.text(title.text().split('<').shift());
			}
			if (e.name == 'parser') FreeJaketOpt();
		});
		if (Lampa.Manifest.app_digital >= 177) {
			Lampa.Storage.sync('my_col', 'object_object');
			Lampa.Storage.sync('fav_chns', 'object_object');
			Lampa.Storage.sync('online_watched_last', 'object_object');
			var balansers_sync = ["filmix", "kinobase", "hdrezka", "rezka", "videocdn", "videodb", "collaps", "hdvb", "kodik", "uakino", "kinotochka", "cdnmovies", "anilibria", "videoapi", "bazon", "pub"];
			balansers_sync.forEach(function(name) {
				Lampa.Storage.sync('online_choice_' + name, 'object_object');
			});
		}

		function add() {
			Modss.init();
			$('body').append(Lampa.Template.get('hdgo_style', {}, true));
			$('body').append(Lampa.Template.get('mods_radio_style', {}, true));
			$('body').append(Lampa.Template.get('modss_style', {}, true));
			$('body').append(Lampa.Template.get('modss_online_css', {}, true));
			//	Lampa.Storage.set('guide', '');
			setTimeout(function() {
				//if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			}, 3000);
			Lampa.SettingsApi.addComponent({
				component: 'settings_modss',
				name: "🎃 HackMods 🏷️ 💎",
				icon: "<svg viewBox='0 0 24 24' xml:space='preserve' xmlns='https://www.w3.org/2000/svg'><path d='M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-2.1 16.4c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V8.4l-3.2 5.4-.1.1-.1.1h-.6s-.1 0-.1-.1l-.1-.1-3-5.4v8.5h1c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1V7.1h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.7c.1 0 .2.1.2.2l3.7 6.2 3.7-6.2.2-.2h1.7c.3 0 .5.2.5.5s-.2.5-.5.5h-1v9.8h1z' fill='#ffffff' class='fill-000000'></path></svg>"
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_status',
					type: 'title'
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:3em;height:2.3em;margin-top:-.5em;padding-right:.5em"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z"></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 5.5v7h2v-7h-2zm-.285 0H8.601l-1.497 4.113L5.607 8.5H3.493l2.611 6.964h2L10.715 8.5zm5.285 5h1.5a2.5 2.5 0 1 0 0-5H14v7h2v-2zm0-2v-1h1.5a.5.5 0 1 1 0 1H16z" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Осталось: <span style="color:#ffda00">900</span> дней</div></div>',
					description: 'Для активации <b style="color: #ffd402;">Vip</b> статуса перейдите в телеграм бот <span style="color: #24b4f9;">@modssmy_bot</span><br>По вопросам <span style="color: #24b4f9;">@modss_group</span>'
				}
			});

			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_device',
					type: 'title'
				},
				field: {
					name: ' 📴 HackDevice 🏷️'
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_password',
					type: 'static', //доступно select,input,trigger,title,static
					placeholder: Lampa.Lang.translate('placeholder_password'),
					values: '',
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_parent_contr'),
					description: Lampa.Lang.translate('placeholder_password')
				},
				onRender: function(item) {
					function pass() {
						Lampa.Input.edit({
							value: '' + Lampa.Storage.get('mods_password') + '',
							free: true,
							nosave: true
						}, function(t) {
							Lampa.Storage.set('mods_password', t);
							Lampa.Settings.update();
						});
					}
					item.on('hover:enter', function() {
						if (Lampa.Storage.get('mods_password')) Lampa.Input.edit({
							value: '',
							title: 'Введите старый пароль',
							free: true,
							nosave: true
						}, function(t) {
							if (t == Lampa.Storage.get('mods_password')) pass();
							else Lampa.Noty.show('Неверный пароль');
						});
						else pass();
					});
					if (Lampa.Storage.get('mods_password')) item.find('.settings-param__descr').text('Изменить пароль');
					else item.find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				},
				onChange: function(value) {
					if (value) $('body').find('.settings-param__descr').text('Изменить пароль');
					else $('body').find('.settings-param__descr').text(Lampa.Lang.translate('placeholder_password'));
				}
			});
			//Add-ons
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_onl',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('modss_title_online').toLowerCase(),
					description: Lampa.Lang.translate('onl_enable_descr')
				},
				onChange: function(value) {
					if (cards) Modss.online('delete');
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'modss_online_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg></div><div style="font-size:1.3em">Online</div></div>'
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function() {
						Lampa.Settings.create('modss_online_param');
						Lampa.Controller.enabled().controller.back = function() {
							Lampa.Settings.create('settings_modss');
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'priority_balanser',
					type: 'select', //доступно select,input,trigger,title,static
					values: Modss.balansers(),
					default: Modss.balansPrf
				},
				field: {
					name: Lampa.Lang.translate('title_prioriry_balanser'),
					description: Lampa.Lang.translate('title_prioriry_balanser_descr')
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) item.show();
					else item.hide();
				},
				onChange: function(values) {
					var title = $('body').find('[data-name="priority_balanser"] .settings-param__value');
					title.text(title.text().split('<').shift());
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_but_first',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_online_first_but'),
				},
				onChange: function(item) {
					Lampa.Storage.set('full_btn_priority', '');
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_continued',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_online_continued'),
					description: Lampa.Lang.translate('title_online_descr')
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_dash',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('online_dash'),
					description: Lampa.Lang.translate('modss_balanser') + ' Collaps'
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) item.show();
					else item.hide();
				}
			});
			//Filmix
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'filmix_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg height="26" width="26" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z" fill="white"/><rect x="2" y="2" width="54" height="53" rx="5" stroke="white" stroke-width="4"/></svg></div><div style="font-size:1.3em">Filmix</div></div>',
					description: ' '
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) {
						item.show();
						$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
						Filmix.checkPro(Filmix.token);
						Filmix.showStatus(item);
					} else item.hide();
					item.on('hover:enter', function() {
						Lampa.Settings.create('filmix_param');
						Lampa.Controller.enabled().controller.back = function() {
							Lampa.Settings.create('modss_online_param');
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'filmix_param',
				param: {
					name: 'filmix_status',
					type: 'title', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: '<b style="color:#fff">' + Lampa.Lang.translate('title_status') + '</b>',
					description: ' '
				},
				onRender: function(item) {
					$('.settings-param__descr', item).before('<div class="settings-param__status"></div>');
					Filmix.showStatus(item);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'filmix_param',
				param: {
					name: 'filmix_token',
					type: 'input', //доступно select,input,trigger,title,static
					values: '',
					placeholder: Lampa.Lang.translate('filmix_param_placeholder'),
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('filmix_param_add_title'),
					description: Lampa.Lang.translate('filmix_param_add_descr')
				},
				onChange: function(value) {
					if (value) {
						Filmix.checkPro(value, true);
						Filmix.token = value;
					} else {
						Lampa.Storage.set("filmix_status", {});
						Filmix.token = value;
						Filmix.showStatus();
					}
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'filmix_param',
				param: {
					name: 'filmix_add',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('filmix_params_add_device') + ' Filmix',
					description: ''
				},
				onRender: function(item) {
					item.on('hover:enter', function() {
						Filmix.add_new();
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'pub_title_onl',
					type: 'title', //доступно select,input,trigger,title,static
				},
				field: {
					name: 'Параметры для балансера Pub'
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_onl')) item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'online_hevc',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_online_hevc'),
					description: Lampa.Lang.translate('title_online__hevc_descr')
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_onl')) item.show();
					else item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'pub_type_striming',
					type: 'select', //доступно select,input,trigger,title,static
					values: {
						0: 'HTTP',
						1: 'HLS',
						2: 'HLS2',
						3: 'HLS4',
					},
					default: 3
				},
				field: {
					name: 'Тип видео потока',
					description: 'Нужен для балансера Pub'
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_onl')) item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'pub_server',
					type: 'select', //доступно select,input,trigger,title,static
					values: {
						0: 'Россия',
						1: 'Нидерланды'
					},
					default: 0
				},
				field: {
					name: 'Сервер видео',
					description: 'Нужен для балансера Pub'
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_onl')) item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_online_param',
				param: {
					name: 'pub_speed',
					type: 'static', //доступно select,input,trigger,title,static
				},
				field: {
					name: 'SpeedTest',
					description: 'Выбор лучшего сервера Pub'
				},
				onRender: function(item) {
					item.on('hover:enter', function() {
						Lampa.Iframe.show({
							url: 'http://zamerka.com/',
							onBack: function onBack() {
								Lampa.Controller.toggle('settings_component');
							}
						});
					});
					if (!Lampa.Storage.field('mods_onl')) item.hide();
				}
			});

			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_addons')
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'pub_tv',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_tv_enable') + ' Pub',
					description: Lampa.Lang.translate('params_tv_enable_descr').replace('Modss', 'SPORT')
				},
				onChange: function(value) {
					Modss.tv_pub();
				}
			});
			//TV
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_tv',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_tv_enable'),
					description: Lampa.Lang.translate('params_tv_enable_descr')
				},
				onChange: function(value) {
					Modss.tv_modss();
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'modss_tv_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="bi bi-tv"><path fill="currentColor" d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg></div><div style="font-size:1.3em">Modss-TV</div></div>',
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_tv')) item.hide();
					item.on('hover:enter', function() {
						Lampa.Settings.create('modss_tv_param');
						Lampa.Controller.enabled().controller.back = function() {
							Lampa.Settings.create('settings_modss');
						};
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_tv_param',
				param: {
					name: 'mods_tv_style',
					type: 'select', //доступно select,input,trigger,title,static
					values: {
						line: 'Строчный',
						vert: 'Вертикальный',
						cats: 'Категории'
					},
					default: 'vert'
				},
				field: {
					name: 'Тип навигации',
					description: 'Вид отображения списка каналов'
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_tv')) item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_tv_param',
				param: {
					name: 'mods_tv_butt_ch',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: 'Переключение каналов',
					description: 'Позволяет переключать каналы кнопками переключения каналов на пульте'
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_tv')) item.hide();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_tv_param',
				param: {
					name: 'mods_tv_cat_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_clear'),
					description: Lampa.Lang.translate('title_fork_clear_descr')
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_tv')) item.hide();
					item.on('hover:enter', function() {
						Lampa.Storage.set('serv_kulik', '');
						Lampa.Storage.set('Modss_tv_cat', '');
						Lampa.Storage.set('mods_tv_last_cat', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'modss_tv_param',
				param: {
					name: 'mods_tv_fav_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_tv_clear_fav'),
					description: Lampa.Lang.translate('title_tv_clear__fav_descr')
				},
				onRender: function(item) {
					if (!Lampa.Storage.field('mods_tv')) item.hide();
					item.on('hover:enter', function() {
						Lampa.Storage.set('fav_chns', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_tv_clear_fav_noty'));
					});
				}
			});
			//ForkTV
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_fork',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ForkTV',
					description: Lampa.Lang.translate('fork_enable_descr')
				},
				onChange: function(value) {
					if (value) ForkTV.check_forktv('', true);
					Lampa.Settings.update();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'fork_param',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-alpha-f-box-outline" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9,7H15V9H11V11H14V13H11V17H9V7M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M5,5V19H19V5H5Z" /></svg></div><div style="font-size:1.3em">ForkTV</div></div>',
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function(item) {
					if (Lampa.Storage.field('mods_fork')) {
						item.show();
						$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
						ForkTV.check_forktv(item, true);
					} else item.hide();
					item.on('hover:enter', function() {
						Lampa.Settings.create('fork_param');
						Lampa.Controller.enabled().controller.back = function() {
							Lampa.Settings.create('settings_modss');
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'forktv_url',
					type: 'static' //доступно select,input,trigger,title,static
				},
				field: {
					name: ForkTV.url,
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function(item) {
					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
					ForkTV.check_forktv(item);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_add',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Storage.get('ForkTv_cat') ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
					description: ''
				},
				onRender: function(item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function() {
						ForkTV.check_forktv(item);
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_clear'),
					description: Lampa.Lang.translate('title_fork_clear_descr')
				},
				onRender: function(item) {
					if (Lampa.Storage.get('forktv_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function() {
						Lampa.Storage.set('ForkTv_cat', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'fork_param',
				param: {
					name: 'ForkTV_clearMac',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_reload_code'),
					description: ' '
				},
				onRender: function(item) {
					item.on('hover:enter', function() {
						ForkTV.updMac(item);
					});
				}
			});
			//Radio
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_radio',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_radio_enable'),
					description: Lampa.Lang.translate('params_radio_enable_descr')
				},
				onChange: function(value) {
					Modss.radio();
				}
			});
			//Collection
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_collection',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: Lampa.Lang.translate('params_pub_on') + ' ' + Lampa.Lang.translate('menu_collections').toLowerCase(),
					description: Lampa.Lang.translate('params_collections_descr')
				},
				onChange: function(value) {
					if (value == 'true') Modss.collections();
					else $('body').find('.menu [data-action="collection"]').remove();
				}
			});
			//Styles
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_title',
					type: 'title', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('params_styles_title')
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_snow',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: 'Снег'
				},
				onChange: function(value) {
					Modss.snow();
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_rating',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_enable_rating'),
					description: Lampa.Lang.translate('title_enable_rating_descr')
				},
				onChange: function(value) {
					if (value == 'true') {
						$('body').find('.rate--kp, .rate--imdb').removeClass('hide');
						Modss.rating_kp_imdb(cards);
					} else $('body').find('.rate--kp, .rate--imdb').addClass('hide');
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'settings_modss',
				param: {
					name: 'mods_serial_info',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: Lampa.Lang.translate('title_info_serial'),
					description: Lampa.Lang.translate('title_info_serial_descr')
				},
				onChange: function(value) {
					if (value == 'true' && $('body').find('.full-start__poster').length) Modss.serialInfo(cards);
					else $('body').find('.files__left .time-line, .card--last_view, .card--new_seria').remove();
				}
			});
			if (/iPhone|iPad|iPod|android|x11/i.test(navigator.userAgent) || (Lampa.Platform.is('android') && window.innerHeight < 1080)) {
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_back',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: Lampa.Lang.translate('title_add_butback'),
						description: Lampa.Lang.translate('title_add_butback_descr')
					},
					onChange: function(value) {
						Lampa.Settings.update();
						if (value == 'true') Modss.buttBack();
						else $('body').find('.elem-mobile-back').remove();
					}
				});
				Lampa.SettingsApi.addParam({
					component: 'settings_modss',
					param: {
						name: 'mods_butt_pos',
						type: 'select', //доступно select,input,trigger,title,static
						values: {
							right: Lampa.Lang.translate('buttback_right'),
							left: Lampa.Lang.translate('buttback_left')
						},
						default: 'right'
					},
					field: {
						name: Lampa.Lang.translate('title_butback_pos'),
					},
					onRender: function(item) {
						if (Lampa.Storage.field('mods_butt_back')) item.show();
						else item.hide();
					},
					onChange: function(value) {
						Modss.buttBack(value);
					}
				});
			}

			//Close_app 
			if (Lampa.Platform.is('android')) {
				Lampa.SettingsApi.addComponent({
					component: 'mods_exit',
					name: Lampa.Lang.translate('title_close_app'),
					icon: '<svg data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><rect height="46" rx="4" ry="4" width="46" x="1" y="1" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></rect><path d="m12 12 24 24M12 36l24-24" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" class="stroke-1d1d1b"></path></svg>'
				});
				Lampa.SettingsApi.addParam({
					component: 'mods_exit',
					param: {
						name: 'close_app',
						type: 'static', //доступно select,input,trigger,title,static
						default: true
					},
					field: {
						name: ''
					},
					onRender: function(item) {
						Lampa.Android.exit();
					}
				});
			}
			FreeJaketOpt();
		}

		if (window.appready) add();
		else {
			Lampa.Listener.follow('app', function(e) {
				if (e.type == 'ready') add();
			});
		}

		function url$1(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			if (params.genres) u = add$4(u, 'genre=' + params.genres);
			if (params.page) u = add$4(u, 'page=' + params.page);
			if (params.query) u = add$4(u, 'q=' + params.query);
			if (params.type) u = add$4(u, 'type=' + params.type);
			if (params.field) u = add$4(u, 'field=' + params.field);
			if (params.id) u = add$4(u, 'actor=' + params.id);
			if (params.perpage) u = add$4(u, 'perpage=' + params.perpage);
			u = add$4(u, 'access_token=' + Pub.token);
			if (params.filter) {
				for (var i in params.filter) {
					u = add$4(u, i + '=' + params.filter[i]);
				}
			}
			return Pub.baseurl + u;
		}

		function add$4(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}

		function get$6(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$1(method, params);
			Pub.network.silent(params.component == 'full' ? API + 'pub/source' : u, function(json) {
				json.url = method;
				oncomplite(json);
			}, onerror, params.component == 'full' ? {
				id: "YXJ0ZW1jaHVwaW40MkBnbWFpbC5jb20=",
				url: u
			} : '');
		}

		function tocard(element) {
			return {
				url: '',
				id: element.id,
				type: element.type,
				title: element.title.split('/')[0],
				promo_title: element.title.split('/')[0],
				original_title: element.title.split('/')[1] || element.title,
				release_date: (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
				first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year : '',
				vote_averagey: parseFloat((element.imdb_rating || 0) + '').toFixed(1),
				vote_average: element.imdb_rating || 0,
				poster: element.posters.big,
				cover: element.posters.wide,
				background_image: element.posters.wide,
				imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
				kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
				year: element.year,
				years: element.years
			};
		}

		function list$2(params, oncomplite, onerror) {
			var url = url$1('v1/items', params, params.type = type);
			if (!params.genres) url = url$1(params.url, params);
			Pub.network["native"](url, function(json) {
				var items = [];
				if (json.items) {
					json.items.forEach(function(element) {
						items.push(tocard(element));
					});
				}
				oncomplite({
					results: items,
					page: json.pagination.current,
					total_pages: json.pagination.total
				});
			}, onerror);
		}

		function main$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(9);
			status.onComplite = function() {
				var fulldata = [];
				var data = status.data;
				for (var i = 1; i <= 9; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function(element) {
					data.push(tocard(element));
				});
				if (name == 's1' || name == 's6') {
					json.wide = true;
					json.small = true;
				}
				if (name == 's2') {
					data.forEach(function(el) {
						el.poster = el.cover;
					});
					json.collection = true;
					json.line_type = 'collection';
				}
				json.results = data;
				status.append(name, json);
			};
			get$6('v1/items/popular?type=movie&sort=views', params, function(json) {
				append(Lampa.Lang.translate('pub_title_popularfilm'), 's1', json);
				Lampa.VideoQuality.add(json.results);
			}, status.error.bind(status));
			get$6('v1/items?type=movie&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newfilm'), 's2', json);
			}, status.error.bind(status));
			get$6('v1/items/popular?type=serial&sort=views', params, function(json) {
				append(Lampa.Lang.translate('pub_title_popularserial'), 's3', json);
				Lampa.VideoQuality.add(json.results);
			}, status.error.bind(status));
			get$6('v1/items?type=serial&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newserial'), 's4', json);
			}, status.error.bind(status));
			get$6('v1/items?type=concert&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newconcert'), 's5', json);
			}, status.error.bind(status));
			get$6('v1/items?type=&quality=4', params, function(json) {
				append('4K', 's6', json);
			}, status.error.bind(status));
			get$6('v1/items?type=documovie&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newdocfilm'), 's7', json);
			}, status.error.bind(status));
			get$6('v1/items?type=docuserial&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newdocserial'), 's8', json);
			}, status.error.bind(status));
			get$6('v1/items?type=tvshow&sort=updated-', params, function(json) {
				append(Lampa.Lang.translate('pub_title_newtvshow'), 's9', json);
			}, status.error.bind(status));
		}

		function category$1(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var status = new Lampa.Status(5);
			status.onComplite = function() {
				var fulldata = [];
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				var data = status.data;
				for (var i = 1; i <= 5; i++) {
					var ipx = 's' + i;
					if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
				}
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.items.forEach(function(element) {
					data.push(tocard(element));
				});
				json.results = data;
				status.append(name, json);
			};
			var type = params.url == 'tv' ? 'serial' : params.url;
			var Name = params.genres ? params.typeName.toLowerCase() : params.url == 'tv' ? Lampa.Lang.translate('menu_tv').toLowerCase() : Lampa.Lang.translate('menu_movies').toLowerCase();
			if (params.genres) {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function(json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + params.janr.toLowerCase(), 's1', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + 'sort=rating-', params, function(json) {
					append(Lampa.Lang.translate('pub_title_rating') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=updated-', params, function(json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&sort=views-', params, function(json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function(json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			} else {
				get$6('v1/items?type=' + type + (params.genres ? '&sort=created-' : ''), params, function(json) {
					append(Lampa.Lang.translate('pub_title_new') + ' ' + Name, 's1', json);
				}, status.error.bind(status));
				get$6('v1/items/popular?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function(json) {
					append(Lampa.Lang.translate('pub_title_popular') + ' ' + Name, 's2', json);
				}, status.error.bind(status));
				get$6('v1/items/fresh?type=' + type + '&sort=views-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function(json) {
					append(Lampa.Lang.translate('pub_title_fresh') + ' ' + Name, 's3', json);
				}, status.error.bind(status));
				get$6('v1/items/hot?type=' + type + '&sort=created-&conditions=' + encodeURIComponent("year=" + Date.now('Y')), params, function(json) {
					append(Lampa.Lang.translate('pub_title_hot') + ' ' + Name, 's4', json);
				}, status.error.bind(status));
				get$6('v1/items?type=' + type + '&quality=4', params, function(json) {
					append('4K ' + Name, 's5', json);
				}, status.error.bind(status));
			}
		}

		function full$1(params, oncomplite, onerror) {
			var status = new Lampa.Status(5);
			status.onComplite = oncomplite;
			var url = 'v1/items/' + params.id;
			get$6(url, params, function(json) {
				json.source = 'pub';
				var data = {};
				var element = json.item;
				get$6('v1/items/similar?id=' + element.id, params, function(json) {
					var similars = [];
					if (json.items) {
						for (var i in json.items) {
							var item = json.items[i];
							similars.push(tocard(item));
						}
						status.append('simular', {
							results: similars
						});
					}
				}, onerror);
				get$6('v1/items/comments?id=' + element.id, params, function(json) {
					var comments = [];
					if (json.comments) {
						for (var i in json.comments) {
							var com = json.comments[i];
							com.text = com.message.replace(/\[n|r|t]/g, '');
							com.like_count = com.rating;
							comments.push(com);
						}
						status.append('comments', comments);
					}
				}, onerror);
				data.movie = {
					id: element.id,
					url: url,
					type: element.type,
					source: 'pub',
					title: element.title.split('/')[0],
					original_title: element.title.split('/')[1] ? element.title.split('/')[1] : element.title.split('/')[0],
					name: element.seasons ? element.title.split('/')[0] : '',
					original_name: element.seasons ? element.title.split('/')[1] : '',
					original_language: element.genres.find(function(e) {
						return e.id == 25
					}) !== undefined ? 'ja' : '',
					overview: element.plot.replace(/\[n|r|t]/g, ''),
					img: element.posters.big,
					runtime: (element.duration.average || 0) / 1000 / 6 * 100,
					genres: genres$1(element, json.item),
					vote_average: parseFloat(element.imdb_rating || element.kinopoisk_rating || '0'),
					production_companies: [],
					production_countries: countries(element.countries, json.item),
					budget: element.budget || 0,
					seasons: element.seasons && element.seasons.filter(function(el) {
						el.episode_count = 1;
						return el
					}) || '',
					release_date: element.year || Lampa.Utils.parseTime(element.created_at).full || '0000',
					number_of_seasons: seasonsCount(element).seasons,
					number_of_episodes: seasonsCount(element).episodes,
					first_air_date: element.type == 'serial' || element.type == 'docuserial' || element.type == 'tvshow' ? element.year || Lampa.Utils.parseTime(element.created_at).full || '0000' : '',
					background_image: element.posters.wide,
					imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
					kp_rating: parseFloat(element.kinopoisk_rating || '0.0').toFixed(1),
					imdb_id: 'tt' + element.imdb,
					kinopoisk_id: element.kinopoisk
				};
				status.append('persons', persons(json));
				status.append('movie', data.movie);
				status.append('videos', videos(element));
			}, onerror);
		}

		function menu$1(params, oncomplite) {
			var u = url$1('v1/types', params);
			var typeName = '';
			Pub.network["native"](u, function(json) {
				Lampa.Select.show({
					title: Lampa.Lang.translate('title_category'),
					items: json.items,
					onBack: this.onBack,
					onSelect: function onSelect(a) {
						type = a.id;
						typeName = a.title;
						get$6('v1/genres?type=' + a.id, params, function(jsons) {
							Lampa.Select.show({
								title: Lampa.Lang.translate('full_genre'),
								items: jsons.items,
								onBack: function onBack() {
									menu$1(params, oncomplite);
								},
								onSelect: function onSelect(a) {
									Lampa.Activity.push({
										url: type,
										title: Lampa.Lang.translate('title_catalog') + ' - ' + typeName + ' - ' + a.title + ' - KinoPUB',
										component: 'category',
										typeName: typeName,
										janr: a.title,
										genres: a.id,
										id: a.id,
										source: 'pub',
										card_type: true,
										page: 1
									});
								}
							});
						}, onerror);
					}
				});
			});
		}

		function seasons$2(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}

		function person$2(params, oncomplite, onerror) {
			var u = url$1('v1/items', params);
			Pub.network["native"](u, function(json, all) {
				var data = {};
				if (json.items) {
					data.person = {
						name: params.id,
						biography: '',
						img: '',
						place_of_birth: '',
						birthday: '----'
					};
					var similars = [];
					for (var i in json.items) {
						var item = json.items[i];
						similars.push(tocard(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
							name: '',
							credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}

		function clear$3() {
			Pub.network.clear();
		}

		function seasonsCount(element) {
			var data = {
				seasons: 0,
				episodes: 0
			};
			if (element.seasons) {
				data.seasons = element.seasons.length;
				element.seasons.forEach(function(ep) {
					data.episodes += ep.episodes.length;
				})
			}
			return data;
		}

		function videos(element) {
			var data = [];
			if (element.trailer) {
				data.push({
					name: element.trailer.title || 'Trailer name',
					url: element.trailer.url,
					youtube: false,
					iso_639_1: 'ru'
				});
			}
			return data.length ? {
				results: data
			} : false;
		}

		function persons(json) {
			var data = [];
			if (json.item.cast) {
				json.item.cast.split(',').forEach(function(name) {
					data.push({
						name: name,
						id: name,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}

		function genres$1(element, json) {
			var data = [];
			element.genres.forEach(function(id) {
				if (id) {
					data.push({
						id: id.id,
						name: id.title
					});
				}
			});
			return data;
		}

		function countries(element, json) {
			var data = [];
			if (element && json.countries) {
				data.push({
					name: element[0].title
				});
			}
			return data;
		}

		function search$3() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function(data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			var mov = params;
			mov.type = '';
			mov.field = 'title';
			mov.perpage = 20;
			get$6('v1/items/search', mov, function(json) {
				var items = [];
				var itemss = [];
				if (json.items) {
					json.items.forEach(function(element) {
						if (element.type == 'movie') items.push(tocard(element));
						else itemss.push(tocard(element));
					});
					var movie = {
						results: items,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_movies') + ' (' + items.length + ')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: json.pagination.current,
						total_pages: json.pagination.total,
						total_results: json.pagination.total_items,
						title: Lampa.Lang.translate('menu_tv') + ' (' + itemss.length + ')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, status.error.bind(status));
		}

		function discovery() {
			return {
				title: 'PUB',
				search: search$3,
				params: {
					align_left: true,
					object: {
						source: 'pub'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'v1/items/search?field=title&type=' + params.data.type,
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						page: 2,
						query: encodeURIComponent(params.query),
						source: 'pub'
					});
				},
				onCancel: Pub.network.clear.bind(Pub.network)
			};
		}
		var PUB = {
			main: main$2,
			menu: menu$1,
			full: full$1,
			search: search$3,
			person: person$2,
			list: list$2,
			seasons: seasons$2,
			category: category$1,
			clear: clear$3,
			discovery: discovery
		};
		Lampa.Api.sources.pub = PUB;

		function url$2(u) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			u = (u == 'undefined' ? '' : u)
			if (params.genres) u = 'catalog' + add$5(u, 'orderby=date&orderdir=desc&filter=s996-' + params.genres.replace('f', 'g'));
			if (params.page) u = add$5(u, 'page=' + params.page);
			if (params.query) u = add$5(u, 'story=' + params.query);
			if (params.type) u = add$5(u, 'type=' + params.type);
			if (params.field) u = add$5(u, 'field=' + params.field);
			if (params.perpage) u = add$5(u, 'perpage=' + params.perpage);
			u = add$5(u, Filmix.user_dev + Lampa.Storage.get('filmix_token', 'aaaabbbbccccddddeeeeffffaaaabbbb'));
			if (params.filter) {
				for (var i in params.filter) {
					u = add$5(u, i + '=' + params.filter[i]);
				}
			}
			return Filmix.api_url + u;
		}

		function add$5(u, params) {
			return u + (/\?/.test(u) ? '&' : '?') + params;
		}

		function get$7(method, call) {
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
			var onerror = arguments.length > 3 ? arguments[3] : undefined;
			var u = url$2(method, params);
			Filmix.network["native"](u, function(json) {
				json.url = method;
				oncomplite(json);
			}, onerror);
		}

		function tocardf(element, type) {
			return {
				url: '',
				id: element.id,
				type: type || (((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id)) ? 'tv' : 'movie'),
				source: 'filmix',
				quality: element.quality && element.quality.split(' ').shift() || '',
				title: element.title,
				original_title: element.original_title || element.title,
				release_date: (element.year || element.date && element.date.split(' ')[2] || '0000'),
				first_air_date: (type == 'tv' || ((element.serial_stats && element.serial_stats.post_id) || (element.last_episode && element.last_episode.post_id))) ? element.year : '',
				img: element.poster,
				cover: element.poster,
				background_image: element.poster,
				vote_average: parseFloat(element.kp_rating || '0.0').toFixed(1),
				imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
				kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
				year: element.year
			};
		}

		function list$3(params, oncomplite, onerror) {
			var page = 2;
			var url = url$2(params.url, params);
			Filmix.network["native"](url, function(json) {
				var items = [];
				if (json) {
					json.forEach(function(element) {
						items.push(tocardf(element));
					});
				}
				oncomplite({
					results: items,
					page: page,
					total_pages: 50
				});
				page++
			}, onerror);
		}

		function main$1(params, oncomplite, onerror) {
			var source = [{
				title: 'title_now_watch',
				url: 'top_views'
			}, {
				title: 'title_new',
				url: 'catalog?orderby=date&orderdir=desc'
			}, {
				title: 'title_new_this_year',
				url: 'catalog?orderby=year&orderdir=desc'
			}, {
				title: 'pub_title_newfilm',
				url: 'catalog?orderby=date&orderdir=desc&filter=s0'
			}, {
				title: '4K',
				url: 'catalog?orderby=date&orderdir=desc&filter=s0-q4'
			}, {
				title: 'pub_title_popularfilm',
				url: 'popular'
			}, {
				title: 'pub_title_popularserial',
				url: 'popular?section=7'
			}, {
				title: 'title_in_top',
				url: 'catalog?orderby=rating&orderdir=desc'
			}];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function() {
				var fulldata = [];
				var data = status.data;
				source.forEach(function(q) {
					if (status.data[q.title] && status.data[q.title].results.length) {
						fulldata.push(status.data[q.title]);
					}
				});
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function(element) {
					data.push(tocardf(element));
				});
				json.results = data;
				status.append(name, json);
			};
			source.forEach(function(q) {
				get$7(q.url, params, function(json) {
					append(Lampa.Lang.translate(q.title), q.title, json);
				}, status.error.bind(status));
			});
		}

		function category$2(params, oncomplite, onerror) {
			var books = Lampa.Favorite.continues(params.url);
			var type = params.url == 'tv' ? 7 : 0;
			var source = [{
				title: 'title_new_this_year',
				url: 'catalog?orderby=year&orderdir=desc&filter=s' + type
			}, {
				title: 'title_new',
				url: 'catalog?orderby=date&orderdir=desc&filter=s' + type
			}, {
				title: 'title_popular',
				url: 'popular?section=' + type
			}, {
				title: 'title_in_top',
				url: 'catalog?orderby=rating&orderdir=desc&filter=s' + type
			}];
			var status = new Lampa.Status(Lampa.Arrays.getKeys(source).length);
			status.onComplite = function() {
				var fulldata = [];
				var data = status.data;
				if (books.length) fulldata.push({
					results: books,
					title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
				});
				source.forEach(function(q) {
					if (data[q.title] && data[q.title].results.length) {
						fulldata.push(data[q.title]);
					}
				});
				if (fulldata.length) oncomplite(fulldata);
				else onerror();
			};
			var append = function append(title, name, json) {
				json.title = title;
				var data = [];
				json.forEach(function(element) {
					data.push(tocardf(element, params.url));
				});
				json.results = data;
				status.append(name, json);
			};
			source.forEach(function(q) {
				get$7(q.url, params, function(json) {
					append(Lampa.Lang.translate(q.title), q.title, json);
				}, status.error.bind(status));
			});
		}

		function full$2(params, oncomplite, onerror) {
			var status = new Lampa.Status(5);
			status.onComplite = oncomplite;
			var url = 'post/' + params.id;
			get$7(url, params, function(json) {
				json.source = 'filmix';
				var data = {};
				var element = json;

				var similars = [];
				if (json.relates) {
					for (var i in json.relates) {
						var item = json.relates[i];
						similars.push(tocardf(item));
					}
					status.append('simular', {
						results: similars
					});
				}

				data.movie = {
					id: element.id,
					url: url,
					type: Lampa.Arrays.getValues(element.player_links.playlist).length ? 'tv' : 'movie',
					source: 'filmix',
					title: element.title,
					original_title: element.original_title,
					name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.title : '',
					original_name: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.original_title : '',
					overview: element.short_story.replace(/\[n|r|t]/g, ''),
					img: element.poster,
					runtime: (element.duration || 0),
					genres: genres$2(element),
					vote_average: parseFloat(element.imdb_rating || element.kp_rating || '0'),
					production_companies: [],
					production_countries: countries2(element.countries),
					budget: element.budget || 0,
					release_date: element.year || element.date.split(' ')[2] || '0000',
					seasons: Lampa.Arrays.getValues(element.player_links.playlist).filter(function(el) {
						el.episode_count = 1;
						return el
					}),
					quality: element.rip && element.rip.split(' ').shift() || '',
					number_of_seasons: Lampa.Arrays.getValues(element.player_links.playlist).length || '',
					number_of_episodes: element.last_episode && element.last_episode.episode || '',
					first_air_date: Lampa.Arrays.getValues(element.player_links.playlist).length ? element.year || element.date_atom || '0000' : '',
					background_image: element.poster,
					imdb_rating: parseFloat(element.imdb_rating || '0.0').toFixed(1),
					kp_rating: parseFloat(element.kp_rating || '0.0').toFixed(1),
				};
				get$7('comments/' + element.id, params, function(json) {
					var comments = [];
					if (json) {
						json.forEach(function(com) {
							com.text = com.text.replace(/\[n|r|t]/g, '');
							com.like_count = '';
							comments.push(com);
						});
						status.append('comments', comments);
						$('.full-review__footer', Lampa.Activity.active().activity.render()).hide();
					}
				}, onerror);
				status.append('persons', persons2(json));
				status.append('movie', data.movie);
				status.append('videos', videos2(element.player_links));
			}, onerror);
		}

		function menu$2(params, oncomplite) {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			if (menu_list.length) oncomplite(menu_list);
			else {
				var us = url$2('filter_list', params);
				var u = url$2('category_list', params);
				Filmix.network["native"](u, function(j) {
					Lampa.Arrays.getKeys(j).forEach(function(g) {
						menu_list.push({
							title: j[g],
							id: g
						});
					});
					console.log(menu_list)
					oncomplite(menu_list);
				});
			}
		}

		function seasons$1(tv, from, oncomplite) {
			Lampa.Api.sources.tmdb.seasons(tv, from, oncomplite);
		}

		function formatDate(dateString) {
			var months = [{
				name: 'января',
				number: '01'
			}, {
				name: 'февраля',
				number: '02'
			}, {
				name: 'марта',
				number: '03'
			}, {
				name: 'апреля',
				number: '04'
			}, {
				name: 'мая',
				number: '05'
			}, {
				name: 'июня',
				number: '06'
			}, {
				name: 'июля',
				number: '07'
			}, {
				name: 'августа',
				number: '08'
			}, {
				name: 'сентября',
				number: '09'
			}, {
				name: 'октября',
				number: '10'
			}, {
				name: 'ноября',
				number: '11'
			}, {
				name: 'декабря',
				number: '12'
			}];

			var parts = dateString.split(' ');
			var day = parts[0];
			var monthName = parts[1];
			var year = parts[2];

			var monthNumber;
			for (var i = 0; i < months.length; i++) {
				if (months[i].name === monthName) {
					monthNumber = months[i].number;
					break;
				}
			}

			var formattedDate = year + '-' + monthNumber + '-' + day;
			return formattedDate;
		}

		function person$3(params, oncomplite, onerror) {
			var u = url$2('person/' + params.id, params);
			Filmix.network["native"](u, function(json, all) {
				var data = {};
				if (json) {
					data.person = {
						id: params.id,
						name: json.name,
						biography: json.about,
						img: json.poster,
						place_of_birth: json.birth_place,
						birthday: formatDate(json.birth)
					};
					var similars = [];
					for (var i in json.movies) {
						var item = json.movies[i];
						similars.push(tocardf(item));
					}
					data.credits = {
						movie: similars,
						knownFor: [{
							name: json.career,
							credits: similars
						}]
					};
				}
				oncomplite(data);
			}, onerror);
		}

		function clear$4() {
			Filmix.network.clear();
		}

		function videos2(element) {
			var data = [];
			if (element.trailer.length) {
				element.trailer.forEach(function(el) {
					var qualities = el.link.match(/\[(.*?)\]/);
					qualities = qualities[1].split(',').filter(function(quality) {
						if (quality === '') return false
						return true
					}).sort(function(a, b) {
						return b - a
					}).map(function(quality) {
						data.push({
							name: el.translation + ' ' + quality + 'p',
							url: el.link.replace(/\[(.*?)\]/, quality),
							player: true
						});
					});
				});
			}
			return data.length ? {
				results: data
			} : false;
		}

		function persons2(json) {
			var data = [];
			if (json.actors) {
				json.found_actors.filter(function(act) {
					data.push({
						name: act.name,
						id: act.id,
						character: Lampa.Lang.translate('title_actor'),
					});
				});
			}
			return data.length ? {
				cast: data
			} : false;
		}

		function genres$2(element) {
			var data = [];
			var u = url$2('category_list');
			Filmix.network["native"](u, function(j) {
				element.categories.forEach(function(name, i) {
					if (name) {
						var _id = Object.entries(j).find(function(g) {
							return g[1] == name
						});
						data.push({
							id: _id && _id[0] || '',
							name: name
						});
					}
				});
			});
			return data;
		}

		function countries2(element) {
			var data = [];
			if (element) {
				element.forEach(function(el) {
					data.push({
						name: el
					});
				});
			}
			return data;
		}

		function search$4() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
			var status = new Lampa.Status(2);
			status.onComplite = function(data) {
				var items = [];
				if (data.movie && data.movie.results.length) items.push(data.movie);
				if (data.tv && data.tv.results.length) items.push(data.tv);
				oncomplite(items);
			};
			get$7('search', params, function(json) {
				var items = [];
				var itemss = [];
				if (json) {
					json.forEach(function(element) {
						if (element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status) itemss.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
						else items.push(tocardf(element, element.last_episode && element.last_episode.season || element.serial_stats && element.serial_stats.status ? 'tv' : 'movie'));
					});
					var movie = {
						results: items,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_movies') + ' (' + items.length + ')',
						type: 'movie'
					};
					status.append('movie', movie);
					var tv = {
						results: itemss,
						page: 1,
						total_pages: 1,
						total_results: json.length,
						title: Lampa.Lang.translate('menu_tv') + ' (' + itemss.length + ')',
						type: 'tv'
					};
					status.append('tv', tv);
				}
			}, status.error.bind(status));
		}

		function discovery$1() {
			return {
				title: 'FILMIX',
				search: search$4,
				params: {
					align_left: true,
					object: {
						source: 'filmix'
					}
				},
				onMore: function onMore(params) {
					Lampa.Activity.push({
						url: 'search',
						title: Lampa.Lang.translate('search') + ' - ' + params.query,
						component: 'category_full',
						query: encodeURIComponent(params.query),
						source: 'filmix'
					});
				},
				onCancel: Pub.network.clear.bind(Pub.network)
			};
		}
		var FILMIX = {
			main: main$1,
			menu: menu$2,
			full: full$2,
			search: search$4,
			person: person$3,
			list: list$3,
			seasons: seasons$1,
			category: category$2,
			clear: clear$4,
			discovery: discovery$1
		};
		Lampa.Api.sources.filmix = FILMIX;

		function include(url) {
			var script = document.createElement('script');
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		include('https://cdn.jsdelivr.net/npm/gaugeJS/dist/gauge.min.js');
		include('https://www.googletagmanager.com/gtag/js?id=G-8LVPC3VETR');
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-8LVPC3VETR');

		function guide() {
			var guide = '<div class="setorrent-checklist"><div class="torrent-checklist__descr">Вас приветствует Guide по использованию и настройке приложения Lampa.<br> Мы пройдём с Вами краткую инструкцию по основным этапам приложения.</div><div class="torrent-checklist__progress-steps">Пройдено 0 из 0</div><div class="torrent-checklist__progress-bar"><div style="width:0"></div></div><div class="torrent-checklist__content"><div class="torrent-checklist__steps hide"><ul class="torrent-checklist__list"><li>Парсер</li><li>Включение парсера</li><li>Плагины</li><li>Добавление плагина</li><li>Установка плагина</li><li>Балансер</li><li>Смена балансера</li><li>Фильтр</li><li>Применение фильтра</li></ul></div><div class="torrent-checklist__infoS"><div class="hide">Откройте Настройки, после перейдите в раздел "Парсер".<hr><img src="' + Protocol() + 'lampa.stream/img/guide/open_parser.jpg"></div><div class="hide">В пункте "Использовать парсер" переведите функцию в положение "Да", после чего в карточке фильма или сериала появится кнопка "Торренты".<hr><img src="' + Protocol() + 'lampa.stream/img/guide/add_parser.jpg"></div><div class="hide">Установка плагинов<hr><img src="' + Protocol() + 'lampa.stream/img/guide/add_plugin.jpg"></div><div class="hide">Для добавления плагинов воспользуйтесь следующими вариантами.<hr><img src="' + Protocol() + 'lampa.stream/img/guide/options_install.jpg"></div><div class="hide">Для добавления плагина, воспользуйтесь списком плагинов<hr><img src="' + Protocol() + 'lampa.stream/img/guide/install_plugin.jpg"></div><div class="hide">Для смены "Онлайн" источника, воспользуйтесь кнопкой Балансер.<hr><img src="' + Protocol() + 'lampa.stream/img/guide/open_balanser.jpg"></div><div class="hide">В случае, если источник не работает (нет подключения к сети) выберете в разделе "Балансер" другой источник.<hr><img src="' + Protocol() + 'lampa.stream/img/guide/balansers_change.jpg"></div><div class="hide">Используйте "Фильтры" для смены перевода и сезона.<hr><img src="' + Protocol() + 'lampa.stream/img/guide/open_filter.jpg"></div><div class="hide">Для смены сезона или озвучки воспользуйтесь пунктами<br>1. Перевод<br>2. Сезон<hr><img src="' + Protocol() + 'lampa.stream/img/guide/filters.jpg"></div><div class="hide">Поздравляем! После прохождения краткого гайда, Вы знаете как пользоваться приложением и у Вас должно возникать меньше вопросов</div></div></div><div class="torrent-checklist__footer"><div class="simple-button selector hide back">Назад</div><div class="simple-button selector next">Начать</div><div class="torrent-checklist__next-step"></div></div></div>';
			Lampa.Template.add('guide', guide);
			var temp = Lampa.Template.get('guide');
			var descr = temp.find('.torrent-checklist__descr');
			var list = temp.find('.torrent-checklist__list > li');
			var info = temp.find('.torrent-checklist__infoS > div');
			var next = temp.find('.torrent-checklist__next-step');
			var prog = temp.find('.torrent-checklist__progress-bar > div');
			var comp = temp.find('.torrent-checklist__progress-steps');
			var btn = temp.find('.next');
			var btn_back = temp.find('.back');
			var position = -2;

			function makeStep(step) {
				step ? position-- : position++;
				var total = list.length;
				comp.text('Пройдено ' + Math.max(0, position) + ' из ' + total);
				if (position > list.length) {
					Lampa.Modal.close();
					Lampa.Controller.toggle('content');
					Lampa.Storage.set('guide', true);
				} else if (position >= 0) {
					Lampa.Storage.set('guide', '');
					info.addClass('hide');
					descr.addClass('hide');
					info.eq(position).removeClass('hide');
					var next_step = list.eq(position + 1);
					prog.css('width', Math.round(position / total * 100) + '%');
					btn.text(position < total ? 'Далее' : 'Завершить');
					if (position > 0) btn_back.removeClass('hide');
					next.text(next_step.length ? '- ' + next_step.text() : '');
				}
			}
			makeStep();
			btn.on('hover:enter', function() {
				makeStep();
			});
			btn_back.on('hover:enter', function() {
				if (position == 1) {
					//	btn_back.removeClass('focus')//.addClass('hide');
					//	btn.addClass('focus');
					//Lampa.Controller.collectionSet() ;
					// Lampa.Controller.collectionFocus(btn);
				}
				if (position > 0) makeStep(true);
			});
			Lampa.Modal.open({
				title: 'Гайд по использованию',
				html: temp,
				size: 'medium',
				mask: true
			});
		}

	}
	if (!window.plugin_modss) startPlugin();

})();