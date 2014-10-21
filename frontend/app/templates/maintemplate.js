angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("app/templates/activity.html",
    "<div class=b-activity><div class=b-activity__filters><i ng-repeat=\"i in [1,2,3,4,5]\" ng-style=myStyle ng-click=\"filterActivity(i);myStyle={opacity:x}\" class=\"fa {{icons[i]}} b-activity__comments-item-image\" style=\"margin-left:5px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 30px\"></i></div><div class=b-activity__input><div class=b-activity__input-field><textarea ng-model=commentContent class=b-activity__input-field-area rows=10 cols=90 placeholder=\"Тут можна залишити свій коментарій...\"></textarea></div><button class=b-activity-comment__btn ng-click=addComment(commentContent)>Додати</button></div><div class=b-activity__comments><div class=b-activity__comments-item ng-repeat=\"activity in activities\" ng-show=checkpoint[activity.ActivityTypes_Id]><i class=\"fa {{icons[activity.ActivityTypes_Id]}} b-activity__comments-item-image\" style=\"margin-left:5px;margin:0;padding:1px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 40px\"></i><div class=b-activity__comments-item-date><span><b>{{activity.Content.userName}}</b></span> <span><b>{{activity.Date.substring(0,10)}}</b></span></div><div class=b-activity__comments-item-content><span ng-show=\"activity.ActivityTypes_Id!=5\">{{activity.Content.Content}}</span> <span ng-show=\"activity.ActivityTypes_Id==5\">{{activity.Content.Content}} <i ng-if=isAdministrator() class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=deleteComment(activity.Id)></i></span></div></div></div></div>");
  $templateCache.put("app/templates/addProblem.html",
    "<div class=b-add-problem><a href=\"\" ng-click=swipeHide() class=close>×</a><div class=b-add-problem-header><h2>Додати проблему</h2></div><form id=my-awesome-dropzone class=\"dropzone b-add-problem-form\" name=submit_problem drop=dropzoneConfig><input style=\"display: none\" ng-model=userId name=\"userId\"> <input style=\"display: none\" ng-model=name name=\"userName\"><div style=display:block class=b-add-problem__step-1 ng-show=showStep_1><div class=b-step-1><div class=b-container_addProblem-navbar><ul class=b-addProblem-navbar><li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=showFirst();><img class=b-addProblem__img src=\"images/icons/map_marker_active.png\"> <span class=b-addproblem-navbar__title>Крок 1</span></li><li class=b-addProblem-navbar__item ng-click=showSecond();><img class=b-addProblem__img src=\"images/icons/info.png\"> <span class=b-addproblem-navbar__title>Крок 2</span></li><li class=b-addProblem-navbar__item ng-click=showThird();><img class=b-addProblem__img src=\"images/icons/add_photo.png\"> <span class=b-addproblem-navbar__title>Крок 3</span></li></ul></div><div class=b-container__note><img src=images/new.gif class=\"b-container__note-img\"> <span class=b-container__note-text>Відмітьте на карті місце розташування проблеми</span></div><div class=b-container__params><span class=b-container__params-lantitle>Latitude:</span> <input class=b-container__params-lanvalue name=latitude ng-model=\"latitude\"> <span class=b-container__params-lngtitle>Longitude:</span> <input class=b-container__params-lngvalue name=longitude ng-model=\"longtitude\"></div><div class=b-crear-float></div></div></div><div style=display:block class=b-add-problem__step-2 ng-show=showStep_2><div class=b-step-2><div class=b-container_addProblem-navbar><ul class=b-addProblem-navbar><li class=b-addProblem-navbar__item ng-click=showFirst();><img class=b-addProblem__img src=\"images/icons/map_marker.png\"> <span class=b-addproblem-navbar__title>Крок 1</span></li><li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=showSecond();><img class=b-addProblem__img src=\"images/icons/info_active.png\"> <span class=b-addproblem-navbar__title>Крок 2</span></li><li class=b-addProblem-navbar__item ng-click=showThird();><img class=b-addProblem__img src=\"images/icons/add_photo.png\"> <span class=b-addproblem-navbar__title>Крок 3</span></li></ul></div><div class=b-step-2__title><label class=b-add-problem-row-content id=b-note__title for=title-field>Назва проблеми:</label><span class=b-note__symbols>(залишилось 70 символів)</span> <input id=title-field name=title maxlength=70 class=\"b-add-problem-row-content input_class\" required></div><div class=b-step-2__select><label class=b-add-problem-row-content for=select-field>Тип проблеми:</label><select name=type id=select-field class=input_class required><option value=\"\"></option><option value=1>Проблеми лісів</option><option value=2>Сміттєзвалища</option><option value=3>Незаконна забудова</option><option value=4>Проблеми водойм</option><option value=5>Загрози біорізноманіттю</option><option value=6>Браконьєрство</option><option value=7>Інші проблеми</option></select></div><div class=b-step-2__textarea><label class=b-add-problem-row-content for=description-field>Опис проблеми:</label><span class=b-note__symbols>(залишилось 500 символів)</span><textarea id=description-field name=content rows=10 required></textarea></div><div class=b-crear-float></div></div></div><div class=b-add-problem__step-3 ng-show=showStep_3><div class=b-step-3><div class=b-container_addProblem-navbar><ul class=b-addProblem-navbar><li class=b-addProblem-navbar__item ng-click=showFirst();><img class=b-addProblem__img src=\"images/icons/map_marker.png\"> <span class=b-addproblem-navbar__title>Крок 1</span></li><li class=b-addProblem-navbar__item ng-click=showSecond();><img class=b-addProblem__img src=\"images/icons/info.png\"> <span class=b-addproblem-navbar__title>Крок 2</span></li><li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=showThird();><img class=b-addProblem__img src=\"images/icons/add_photo_active.png\"> <span class=b-addproblem-navbar__title>Крок 3</span></li></ul></div><div class=b-step-3__dropzone><div class=previews><p><span class=b-conteiner__drop-title-1><strong>+ Drop files</strong> to upload</span></p><span class=b-conteiner__drop-title-2>(or click)</span></div></div><div class=b-add-problem-row-for-buttons><p class=b-note>Щоб додати проблему анонімно - натисніть \"Опублікувати\".</p><p>Ви можете <a href=\"\" id=btn-join-us ng-click=showRegisterForm()>зареєструватись</a>, або авторизуватися через соціальнк мережу, щоб інформація про автора збереглася при публікації проблеми.</p><a href=# ng-click=logInFB() class=b-fb-link title=Facebook></a> <a href=# class=b-gp-link title=Google+></a> <a href=# class=b-vk-link title=Вконтакте></a> <a href=# class=b-tw-link title=Twitter></a></div><div class=b-add-problem-new_user ng-show=showRegForm><div class=b-add-problem-row-new_user-left required><label class=\"b-add-problem-new_user-label text_class\" for=login-field>Login</label><input id=login-field name=login class=\"b-add-problem-row_input input_class\"></div><div class=b-add-problem-row-new_user-right><label class=\"b-add-problem-new_user-label text_class\" for=email-field>Email</label><input type=email id=email-field name=email class=\"b-add-problem-row_input input_class\"></div><div class=b-add-problem-row-new_user-left><label class=\"b-add-problem-new_user-label text_class\" for=password-field>Password</label><input type=password id=password-field name=password class=\"b-add-problem-row_input input_class\"></div><div class=b-add-problem-row-new_user-right><label class=\"b-add-problem-new_user-label text_class\" for=password2-field>Confirm password</label><input type=password id=password2-field name=password class=\"b-add-problem-row_input input_class\"></div><div class=b-crear-float></div></div><input id=btn-submit type=button class=\"b-add-problem-button btn-forward-step-3 b-public\" value=Опублікувати><div class=b-crear-float></div><div class=b-crear-float></div></div></div></form></div>");
  $templateCache.put("app/templates/adminPage.html",
    "<div class=b-wrapper-inside-blocks><a href=#/map class=close>×</a> <div class=b-filters>ФІЛЬТР ПО ТИПАМ ПРОБЛЕМ<form method=\"\" action=\"\" id=ecoProblem></form>ФІЛЬТРИ ДЛЯ АДМІНІСТРАТОРА </div><div class=b-problem-list ng-show=blockVisible><div class=b-problem-list__caption>СПИСОК НОВИХ ПРОБЛЕМ</div><ul class=b-problem-list-items ng-show=infoVisible><li class=b-problem-list-item ng-repeat=\"problem in problems\"><div class=b-problem-list-item__created ng-hide=compareDate($index)>{{problem.created|date:'shortDate'}}</div><div class=b-problem-list-item__title ng-click=getDeatiledProblemInfo($index)><a href=\"\" class=b-problem-list-item__link>{{problem.title}}</a></div></li></ul></div><div class=b-problem-deatiled-info ng-show=v_DeatiledProblemInfo><div class=b-problem-deatiled-info-header><form method=\"\" action=\"\" class=b-problem-deatiled-info-form><input type=button value=Редагувати class=b-problem-deatiled-info_edit> <input type=button value=Видалити class=b-problem-deatiled-info_delete></form><div class=b-problem-deatiled-info-title><img src=images/icons/waste_icon.png class=b-problem-deatiled-info-title__icon><div class=b-problem-deatiled-info-title__text>{{problems[problemId].title}}</div><div class=b-problem-deatiled-info-user><div class=b-problem-deatiled-info-user__name>Василь</div><div class=b-problem-deatiled-info-user__date>{{problems[problemId].created|date:'shortDate'}}</div></div></div><div class=b-problem-deatiled-info-general><div class=b-problem-deatiled-info-severity><div class=b-problem-deatiled-info__caption>Важливість</div><div class=b-problem-deatiled-info__severity ng-controller=RatingCtrl><rating ng-model=rate max=max readonly on-hover=hoveringOver(value) on-leave=\"overStar = null\"></rating></div></div><div class=\"btn-group b-problem-deatiled-info__status\"><div class=b-problem-deatiled-info-status__text>Status</div><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitch checked><label class=onoffswitch-label for=myonoffswitch><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div class=b-problem-deatiled-info-votes><span class=\"glyphicon glyphicon-heart\"></span> {{problems[problemId].votes}}</div></div></div><div class=b-problem-deatiled-info-description><div class=b-problem-deatiled-info-description__title>Детально</div><div class=b-problem-deatiled-info-description__content>{{problems[problemId].content}}</div><div class=b-problem-deatiled-info-description-photos><img src=images/icons/noImage_icon.png class=b-problem-deatiled-info-description-photos__photo> <img src=images/icons/noImage_icon.png class=b-problem-deatiled-info-description-photos__photo> <img src=images/icons/noImage_icon.png class=b-problem-deatiled-info-description-photos__photo> <img src=images/icons/noImage_icon.png class=b-problem-deatiled-info-description-photos__photo> <img src=images/icons/noImage_icon.png class=b-problem-deatiled-info-description-photos__photo></div></div><div class=b-problem-deatiled-info-userComments><div class=b-problem-deatiled-info-userComments__title>Коментарі користувачів</div><div class=b-problem-deatiled-info-userCommentsList><div class=b-problem-deatiled-info-userCommentList__item><div class=b-problem-deatiled-info-userComment__userName>Василь Петрович</div><div class=b-problem-deatiled-info-userComment__date>24.04.13 о 23:15</div><div class=b-problem-deatiled-info-userComment__activityType></div></div><div class=b-problem-deatiled-info-userComment__content>Повідомив про проблему</div></div><div class=b-problem-deatiled-info-userCommentsList><div class=b-problem-deatiled-info-userCommentList__item><div class=b-problem-deatiled-info-userComment__userName>Петро</div><div class=b-problem-deatiled-info-userComment__date>05.07.13 о 23:15</div><div class=b-problem-deatiled-info-userComment__activityType></div></div><div class=b-problem-deatiled-info-userComment__content>Друзі, Всіх небайдужих запрошуємо долучитися до прибирання в міському парку ім. Л.Українки</div></div></div></div><div class=b-empty-bottom></div></div>");
  $templateCache.put("app/templates/chat.html",
    "<div class=b-chat__container><a ng-href=#/map ng-click=swipeHide() class=close>×</a><div class=b-chat__currentNews><h3 style=\"text-align: center\">Новини що відображаються зараз на сайті:</h3><ul class=b-chat__newsItem ng-repeat=\"news in messageLogs\"><li class=b-chat__newsItem-li>{{news.Content}}</li><i class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=sendMessage($index+1)></i></ul></div><form role=form novalidate name=form><div class=form-group><span class=b-chat-comment__title>Додати повідомлення</span><textarea class=b-chat-comment__field ng-model=message placeholder=\"Напишіть тут текст повідомлення...\"></textarea><input type=button class=b-chat-comment__btn ng-enable=form.$valid ng-click=sendMessage(message) value=\"Додати\"></div></form></div>");
  $templateCache.put("app/templates/editorPage.html",
    "<a href=#/map ng-click=swipeHide() class=close>×</a><form class=editor name=EditForm ng-submit=submitForm(EditForm.$valid) novalidate><div class=editor_horizontal><div class=editor_left><label>Заголовок ресурсу:</label><input name=Title ng-model=Title ng-minlength=3 ng-maxlength=40 required><p ng-if=\"EditForm.Title.$error.required && !EditForm.Title.$pristine\">Це поле обов'язкове для заповнення!</p></div><div class=editor_left><label>Alias для ресурсу:</label><input ng-model=Alias name=Alias required ng-pattern=\"/^[0-9a-zA-Z\\-]+$/\"><p ng-if=EditForm.Alias.$error.pattern>Це поле може містити лише латинські літери, цифри та символ \"-\" !</p><p ng-if=\"EditForm.Alias.$error.required && !EditForm.Alias.$pristine\">Це поле обов'язкове для заповнення!</p></div></div><div class=editor_horizontal><div text-angular=text-angular ta-toolbar=\"[['h2', 'h3', 'h4', 'p', 'pre', 'quote'],['bold', 'italics', 'underline', 'ul', 'ol', 'clear'],['justifyLeft','justifyCenter','justifyRight'],	['html', 'insertImage', 'insertLink', 'insertVideo']]\" name=htmlontent ng-model=Content class=editor_ta></div></div><div class=editor_horizontal><div class=editor_left><label>Де розмістити цей ресурс:</label><select ng-model=IsResource name=IsResource required><option value=0>У верхньому меню</option><option value=1>В розділі \"Ресурси\"</option></select><span ng-if=EditForm.IsResource.$error.required>Це поле обов'язкове для заповнення!</span></div><div class=editor_left><button type=submit class=\"b-form__button editor_button\" type=submit ng-click=\"sendResource(Alias, Content, Title, IsResource, Id)\">Відправити</button></div><span ng-if=errorMsq>errorMsq</span></div></form>");
  $templateCache.put("app/templates/filters.html",
    "<div class=b-container-filters-left><div class=info-problem-filters ng-controller=datePicker><div class=problem><p class=title>ФИЛЬТРАЦІЯ ЗА ДАТОЮ</p></div><div class=\"datepicker input-group\"><span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"open($event,'dt')\"><i class=\"fa fa-calendar\"></i> Показати з:</button></span> <input class=form-control datepicker-popup={{format}} ng-model=todayTime.formDataDt is-open=datepickers.dt min-date=minDate max-date=todayTime.formDataDtSecond datepicker-options=dateOptions ng-required=true close-text={{texts.close}} current-text={{texts.today}} clear-text={{texts.clear}} ng-change=\"toggleSelection()\"></div><div class=\"datepicker input-group\"><span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=\"open($event, 'dtSecond')\"><i class=\"fa fa-calendar\"></i> Показати до:</button></span> <input class=form-control datepicker-popup={{format}} ng-model=todayTime.formDataDtSecond is-open=datepickers.dtSecond min-date=todayTime.formDataDt max-date=formDataToday datepicker-options=dateOptions ng-required=true close-text={{texts.close}} current-text={{texts.today}} clear-text={{texts.clear}} ng-change=\"toggleSelection()\"></div><div class=problem><p class=title>ТИП ПРОБЛЕМ</p><input ng-repeat-start=\"problemType in problemTypes\" id=\"{{'type' + problemType.id}}\" type=checkbox ng-model=problemType.selected ng-change=toggleSelection()><label ng-repeat-end for=\"{{'type' + problemType.id}}\">{{problemType.name}}</label></div><div class=problem><p class=title>СТАТУС ПРОБЛЕМ</p><input ng-repeat-start=\"problemStatus in problemStatuses\" id=\"{{'status' + problemStatus.id}}\" type=checkbox ng-model=problemStatus.selected ng-change=toggleSelection()><label ng-repeat-end for=\"{{'status' + problemStatus.id}}\">{{problemStatus.name}}</label></div><div class=\"problem controls\" ng-show=isLoggedIn()><input id=userProblems type=checkbox ng-model=placeUserProblemsChecker ng-change=toggleSelection()><label for=userProblems>Відобразити мої</label></div></div></div><script id=template/datepicker/day.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "    <thead>\n" +
    "        <tr>\n" +
    "        <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "        <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "        <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "        <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "        <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "        </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"row in rows track by $index\">\n" +
    "        <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "        <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "        </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "</table></script><script id=template/datepicker/month.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table></script><script id=template/datepicker/year.html type=text/ng-template><table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"fa fa-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table></script><script id=template/datepicker/popup.html type=text/ng-template><ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: 11+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "    <li ng-transclude></li>\n" +
    "    <li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "        <span class=\"btn-group\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "        </span>\n" +
    "    </li>\n" +
    "</ul></script>");
  $templateCache.put("app/templates/map.html",
    "<div class=b-view>Hello, my dear friend!</div>");
  $templateCache.put("app/templates/navbar.html",
    "<nav class=\"navbar navbar-default b-header\" role=navigation><slider></slider><div class=container-fluid><div class=navbar-header><div><a href=#/map ng-click=swipeHide()><img src=images/logo.png class=\"b-header__logo\"></a></div><button type=button class=navbar-toggle ng-init=\"navCollapsed = true\" ng-click=\"navCollapsed = !navCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=\"navbar-brand b-menu__button\" ng-href=#/problem/addProblem ng-click=swipeHide()>Повідомити про проблему</a></div><div class=\"collapse navbar-collapse\" ng-class=\"!navCollapsed && 'in'\" ng-init=getTitles()><ul class=\"nav navbar-nav\"><li ng-repeat=\"title in data\" ng-if=!title.IsResource class=b-menu__button><a id=link href=#/resources/{{title.Alias}}>{{title.Title}}</a> <i class=\"fa fa-pencil fa-xs\" ng-if=isAdministrator() ng-click=editResource(title.Alias)></i> <i class=\"fa fa-trash fa-xs\" ng-if=isAdministrator() ng-click=deleteResource(title.Id)></i></li><li class=dropdown><a href=# class=\"dropdown-toggle b-menu__button\">Ресурси <span class=\"fa fa-caret-down\"></span></a><ul class=dropdown-menu id=b-header__resources><li ng-repeat=\"title in data\" ng-if=title.IsResource><a id=link href=#/resources/{{title.Alias}}>{{title.Title}}</a> <i class=\"fa fa-pencil\" ng-if=isAdministrator() ng-click=editResource(title.Alias)></i> <i class=\"fa fa-trash\" ng-if=isAdministrator() ng-click=deleteResource(title.Id)></i></li><li ng-if=isAdministrator()><a href=#/addResource class=b-menu__button><i class=\"fa fa-plus\"></i> Додати новий ресурс</a></li></ul></li><li class=b-menu__button><a ng-href=#/stats>Статистика</a></li><li class=dropdown ng-hide=isLoggedIn()><a class=\"dropdown-toggle b-menu__button\" href=#>Вхід <span class=\"fa fa-caret-down\"></span></a><ul class=dropdown-menu id=b-header__login-menu stop-event=click><li><form name=login><div class=form-group><input class=form-control name=email required placeholder=Email></div><div class=form-group><input type=password class=form-control name=password required placeholder=Пароль></div><button type=submit value=Вхід ng-click=postLogIn() class=\"btn btn-default b-menu__button\" id=login-button>Вхід</button><div class=divider></div></form><div style=\"margin: 0 10px 0;padding-bottom: 5px\"><button class=\"btn btn-default\" style=border-radius:0 id=loginfb href=# ng-click=logInFB()><i class=\"fa fa-facebook-square fa-lg\"></i> Вхід</button> <button class=\"btn btn-default\" style=border-radius:0 id=register-button href=# ng-click=\"open('')\">Реєстрація</button></div></li></ul></li><li ng-if=isAdministrator()><a class=b-menu__button ng-href=#/chat ng-click=swipeHide()><i class=\"fa fa-weixin\"></i> Новини</a></li><li><user></user></li></ul><ul class=\"nav navbar-nav navbar-right\" ng-show=isLoggedIn()><li class=dropdown><a class=\"dropdown-toggle b-menu__button\"><i class=\"fa fa-user\"></i> {{name}} {{surname}} <span class=\"fa fa-caret-down\"></span></a><ul class=dropdown-menu><li><a class=b-menu__button ng-click=logOut() href=\"/\"><i class=\"fa fa-sign-out\"></i> Вийти</a></li></ul></li></ul></div></div></nav>");
  $templateCache.put("app/templates/notApproved.html",
    "<div class=b-new-problem-list ng-controller=notApprovedCtrl ng-if=isAdministrator() ng-hide=!notApproved.length><div class=b-new-problem-list__caption>СПИСОК НОВИХ ПРОБЛЕМ</div><ul class=b-new-problem-list-items><li class=b-new-items__item ng-repeat=\"problem in notApproved\" ng-click=showProblem(problem)><div class=b-new-item__title>{{problem.Title}}</div><div class=b-new-item__buttons><ul class=b-buttons><li class=\"b-buttons__button fa fa-check\" ng-click=approveProblem(problem)></li><li class=\"b-buttons__button fa fa-remove\" ng-click=deleteProblem(problem)></li></ul></div></li></ul></div>");
  $templateCache.put("app/templates/rating.html",
    "<div><span ng-mouseleave=reset()><i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=glyphicon ng-class=\"$index < val && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\"></i></span></div>");
  $templateCache.put("app/templates/register.html",
    "<alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)>{{alert.msg}}</alert><div class=modal-header ng-hide=formHide><h3 class=modal-title>Реєстрація нового користувача:</h3></div><div class=modal-body ng-hide=formHide><form class=b-registration__form name=registerForm ng-submit=submitForm(registerForm.$valid) novalidate><div class=form-group><label for=first_name>Ім’я</label><input id=first_name class=form-control name=first_name ng-model=user.first_name ng-minlength=3 ng-maxlength=40 required><p ng-show=\"registerForm.first_name.$error.required && !registerForm.first_name.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=registerForm.first_name.$error.minlength class=help-block>Ім’я має бути не менше ніж 3 символи.</p><p ng-show=registerForm.first_name.$error.maxlength class=help-block>Ім’я має бути не довше ніж 45 символів.</p></div><div class=form-group><label for=last_name>Прізвище</label><input id=last_name class=form-control name=last_name ng-model=user.last_name ng-minlength=3 ng-maxlength=45 required><p ng-show=\"registerForm.last_name.$error.required && !registerForm.last_name.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=registerForm.last_name.$error.minlength class=help-block>Прізвище має бути не менше ніж 3 символи.</p><p ng-show=registerForm.last_name.$error.maxlength class=help-block>Прізвище має бути не довше ніж 45 символів.</p></div><div class=form-group><label for=email>Пошта</label><input type=email id=email class=form-control name=email ng-model=user.email required><p ng-show=\"registerForm.email.$error.required && !registerForm.email.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"registerForm.email.$invalid && !registerForm.email.$pristine\" class=help-block>Введіть коректну пошту.</p><span class=help-block ng-bind=wrongEmail></span></div><div class=form-group><label for=password>Пароль</label><input type=password id=password class=form-control name=password ng-model=user.password required><p ng-show=\"registerForm.password.$error.required && !registerForm.password.$pristine\" class=help-block>Це поле обов’язкове.</p></div><div class=form-group><label for=password_second>Повторіть пароль</label><input type=password id=password_second class=form-control name=password_second ng-model=user.password_second required><p ng-show=\"registerForm.password_second.$error.required && !registerForm.password_second.$pristine\" class=help-block>Це поле обов’язкове.</p><p ng-show=\"user.password != user.password_second && !registerForm.password_second.$pristine\" class=help-block>Паролі не співпадають.</p></div><div class=modal-footer><input type=submit value=Зареєструватися! class=\"b-form__button\"></div></form></div>");
  $templateCache.put("app/templates/resources.html",
    "<div class=resource><a href=#/map ng-click=swipeHide() class=close>×</a><h1 ng-bind-html=resource.Title></h1><div ta-bind ng-model=resource.Content></div></div>");
  $templateCache.put("app/templates/showProblem.html",
    "<div class=b-right-side__show-problem><div class=b-editproblemctr><a href=\"\" ng-click=swipeHide() class=close>×</a></div><div class=b-problems><div class=b-problem-deatiled-info-title><img ng-src=images/markers/{{problem.ProblemTypes_Id}}.png class=b-problem-deatiled-info-title__icon><div class=b-problem-deatiled-info-title__text><editproblemtitle value=problem.Title></editproblemtitle></div><div class=b-problem-deatiled-info-user><div class=b-problem-deatiled-info-user__name>{{problem.userName}}</div><div class=b-problem-deatiled-info-user__date>{{problem.CreatedDate | date:'dd/MM/yyyy HH:MM'}}</div></div></div><div class=b-problem-deatiled-info-general><div class=b-problem-deatiled-info-severity><div class=b-problem-deatiled-info__caption>Важливість</div><div class=b-problem-deatiled-info__severity ng-init=problem.Severity><rating ng-model=problem.Severity readonly state-on=\"'fa-star'\" state-off=\"'fa-star-o'\"></rating></div></div><div class=\"btn-group b-problem-deatiled-info__status\"><div class=b-problem-deatiled-info-status__text>{{problem.Status}}<div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitch ng-model=problem.Status ng-true-value=Вирішина ng-false-value=Актуальна ng-change=\"checked = !checked\" ng-disabled=!isAdministrator()><label class=onoffswitch-label for=myonoffswitch><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div class=b-problem-deatiled-info-votes><button class=simple_like_img ng-click=addOneVote() ng-disabled=disableVoteButton><span><i class=\"fa fa-fw\"></i></span></button> {{problem.Votes}}</div></div><tabset justified=true class=b-problem-tab><tab heading=Детально><div class=b-problem-deatiled-info-description><div class=b-problem-deatiled-info-description__title></div><div class=b-problem-deatiled-info-description__content><label>Опис проблеми:</label><br><editproblemcontent value=problem.Content></editproblemcontent></div><div class=b-problem-deatiled-info-description__content><label>Пропозиції щодо вирішення:</label><br><editproblemproposal value=problem.Proposal></editproblemproposal></div><div class=b-problem-deatiled-info-description-photos><div class=show_photo ng-repeat=\"photo in photos\"><img ng-click=showSliderFunc() ng-src=photos/large/{{photo.Link}} class=\"b-details-body-problem-photo\"> <i class=\"fa fa-check show_photo_label_{{photo.Status}}\"></i></div><div class=b-details-body-problem-photo_add ng-click=showDrop() ng-show=showAddPhotoButton>+ Додати фото</div><form id=addPhotoDropzone class=\"dropzone b-add-problem-form\" name=upload_photo drop=dropzoneConfig ng-show=showDropField><input style=\"display: none\" ng-model=userId name=\"userId\"> <input style=\"display: none\" ng-model=name name=\"userName\"><div class=\"previews previews_show\"><p><span class=b-conteiner__drop-title-1><strong>+ Перемістить сюди фото</strong>для завантаження</span></p><span class=b-conteiner__drop-title-2>(або натисніть)</span></div><div class=b-details-body__status><label style=\"cursor: pointer\">Проблема вже вирішена? <input style=\"cursor: pointer\" type=checkbox name=solveProblemMark></label></div><input id=btn-submit type=button class=\"b-add-problem-button btn-forward-step-3 b-public\" value=Додати> <input id=btn-reload type=button ng-click=hideAddPhotoForm() class=\"b-add-problem-button btn-forward-step-3 b-public\" value=Звернути></form></div></div></tab><tab heading=\"Коментарі користувачів\"><activity></activity></tab></tabset><div><button type=button class=\"btn btn-sm {{editStatusClass}}\" ng-show=isAdministrator() ng-click=\"saveChangestoDb(problem.Title,problem.Severity, problem.Status, problem.Content,problem.Proposal)\">Збережіть зміни</button> <button type=button class=\"btn {{addStatus}} btn-sm\" ng-show=isAdministrator() ng-click=addProblemToDB()>Додати проблему до бази</button> <button type=button class=\"btn {{delStatus}} btn-sm\" ng-show=isAdministrator() ng-click=deleteProblemFromDb()>Видалити проблему з бази</button></div></div></div></div>");
  $templateCache.put("app/templates/slider.html",
    "<div ng-if=showSlider><div class=slider-fon ng-show=showSlider></div><div class=\"container slider\" ng-show=showSlider><i class=\"fa fa-close close\" style=\"top:0px; right:0px;z-index: 5;color:#fff;opacity:1\" ng-click=hideSlider()></i><ul style=height:360px rn-carousel rn-carousel-control rn-carousel-indicator class=image><li style=height:360px ng-repeat=\"slide in slides\" ng-style=\"{ backgroundImage: 'url(' + slide.image + ')' }\"><div style=color:#fff;margin-top:360px class=layer>{{ slide.text }}</div></li></ul></div></div>");
  $templateCache.put("app/templates/statistic.html",
    "<style>.statistic > h3, h2, ul {\n" +
    "  margin: 30px auto;\n" +
    "  text-align: center;\n" +
    "}\n" +
    ".statistic h1, h2, h3 {\n" +
    "    font-family: WWF;\n" +
    "    line-height: 1em;\n" +
    "    }\n" +
    ".statistic h1 {\n" +
    "    font-size: 2em;\n" +
    "    text-align: center;\n" +
    "    \n" +
    "}\n" +
    ".statistic h2 {\n" +
    "    font-size: 2em;\n" +
    "}\n" +
    ".statistic h3 {\n" +
    "    font-size: 2em;\n" +
    "}\n" +
    ".light {\n" +
    "    font-weight: 300;\n" +
    "}\n" +
    "\n" +
    ".statistic {\n" +
    "   margin: 10px 5px 15px 5px;\n" +
    "}\n" +
    ".statistic svg {\n" +
    "  font-size: 0.6em; \n" +
    "}\n" +
    ".main text {\n" +
    "  font: 12px sans-serif;\n" +
    "}\n" +
    ".mini text {\n" +
    "  font: 10px sans-serif;  \n" +
    "}\n" +
    ".month text {\n" +
    "  text-anchor: start;\n" +
    "}\n" +
    ".todayLine {\n" +
    "  stroke: blue;\n" +
    "  stroke-width: 1.5;\n" +
    "}\n" +
    ".axis line, .axis path {\n" +
    "  stroke: black;\n" +
    "}\n" +
    ".brush .extent {\n" +
    "  stroke: gray;\n" +
    "  fill: blue;\n" +
    "  fill-opacity: .165;\n" +
    "}\n" +
    ".statistic > ul {\n" +
    "list-style: none;\n" +
    "}\n" +
    ".statistic  li {\n" +
    "padding: 0px 30px;\n" +
    "display: inline-block;\n" +
    "}\n" +
    ".statistic  li span{\n" +
    "font-size: 4em;\n" +
    "}\n" +
    ".statistic .legend {\n" +
    "  text-align: left;\n" +
    "  margin: 10px 10px 20px 10px;\n" +
    "  padding: 5px 5px;\n" +
    "  font-size: 0.65em;\n" +
    "}\n" +
    ".pie {\n" +
    "    margin: 0 auto;\n" +
    "    text-align: center;\n" +
    "}</style><close-button></close-button><div class=statistic><h1>Статистика за весь час</h1><ul><li><span>{{problems}}</span><br>Проблем</li><li><span>{{votes}}</span><br>Голосів</li><li><span>{{comments}}</span><br>Коментарів</li><li><span>{{photos}}</span><br>Фотографій</li></ul><h3 class=light>Статистика проблем за останній</h3><div class=pie><a href=\"\" ng-click=\"pie('D')\">День</a> | <a href=\"\" ng-click=\"pie('W')\">Тиждень</a> | <a href=\"\" ng-click=\"pie('M')\">Місяць</a> | <a href=\"\" ng-click=\"pie('Y')\">Рік</a> | <a href=\"\" ng-click=\"pie('A')\">За весь час</a><br><svg id=el2 ng-init=\"pie('A')\"></svg></div><ul class=legend ng-init=\"color = ['#095B0F', '#231F20', '#98442B', '#1B9AD6', '#71BF44', '#FFAB09', '#50095B']\"><li ng-repeat=\"types in problemTypes\"><svg width=12 height=12><rect width=12 height=12 style=\"fill:{{color[$index]}}\"></svg> - {{types.name}}</li></ul><h3>Хронологія публікацій та голосів</h3><ul class=legend><li><svg width=5 height=15><rect width=5 height=15 style=\"fill:#f00; opacity: 0.5\"></svg> - Додано проблему</li><li><svg width=5 height=15><rect width=5 height=15 style=\"fill:#00f; opacity: 0.5\"></svg> - Додано голос</li></ul><svg id=el1 ng-init=chart()></svg></div>");
  $templateCache.put("app/templates/userChatLine.html",
    "<div ng-show=showNewsContainer class=chat-user-label><div ng-repeat=\"messageLog in messageLogs\" ng-style={display:messageLog.show} class=chat-user-label{{messageLogHide}}>{{messageLog.Content}}</div><i class=\"fa fa-close close\" ng-click=\"showNewsContainer=false\"></i></div>");
}]);
