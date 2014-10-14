var Templates = {"Activity":"<div class=\"b-activity\"> <div class=\"b-activity__filters\"> <!-- <span ng-repeat=\"i in [1,2,3,4,5]\" ng-style=\"myStyle\" ng-click=\"filterActivity(i);myStyle={opacity:x}\" class=\"glyphicon glyphicon-{{icons[i]}} b-activity__comments-item-image\" style=\"margin-left:5px;display: inline-block;float: left;font-size: 24px\"></span>--> <i ng-repeat=\"i in [1,2,3,4,5]\" ng-style=\"myStyle\" ng-click=\"filterActivity(i);myStyle={opacity:x}\" class=\"fa {{icons[i]}} b-activity__comments-item-image\" style=\"margin-left:5px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 30px\"></i> </div> <div class=\"b-activity__input\"> <div class=\"b-activity__input-field\"> <textarea ng-model=\"commentContent\" class=\"b-activity__input-field-area\" rows=\"10\" cols=\"90\" placeholder=\"Тут можна залишити свій коментарій...\"></textarea> </div> <button class=\"b-activity-comment__btn\" ng-click=\"addComment(commentContent)\">Додати</button> </div> <div class=\"b-activity__comments\"> <div class=\"b-activity__comments-item\" ng-repeat=\"activity in activities\" ng-show=\"checkpoint[activity.ActivityTypes_Id]\"> <!-- <img class=\"b-activity__comments-item-image\" src=\"images/icons/activityMarker_{{activity.ActivityTypes_Id}}.png\">--> <!--<span class=\"glyphicon glyphicon-{{icons[activity.ActivityTypes_Id]}} b-activity__comments-item-image\" style=\"font-size: 24px\"></span>--> <i class=\"fa {{icons[activity.ActivityTypes_Id]}} b-activity__comments-item-image\" style=\"margin-left:5px;margin:0;padding:1px;display: inline-block;float:left;font-size: 24px;margin:0;line-height: 40px\"></i> <div class=\"b-activity__comments-item-date\"> <span><b>{{activity.Content.userName}}</b></span> <span><b>{{activity.Date.substring(0,10)}}</b></span> </div> <div class=\"b-activity__comments-item-content\"> <span ng-show=\"activity.ActivityTypes_Id!=5\">{{activity.Content.Content}}</span> <span ng-show=\"activity.ActivityTypes_Id==5\">{{activity.Content.Content}} <i ng-if=\"isAdministrator()\" class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=\"deleteComment(activity.Id)\"></i></span> </div> </div> </div> </div>","AddProblem":"<div class=\"b-add-problem\" > <a href=\"#/map\" class=\"close\">×</a> <div class=\"b-add-problem-header\"><h2>Додати проблему</h2></div> <form id=\"my-awesome-dropzone\" class=\"dropzone b-add-problem-form\" name=\"submit_problem\" drop=\"dropzoneConfig\"> <input type=\"text\" style=\"display: none\" ng-model=\"userId\" name=\"userId\"/> <input type=\"text\" style=\"display: none\" ng-model=\"name\" name=\"userName\"/> <div style=\"display:block\" class=\"b-add-problem__step-1\" ng-show=\"showStep_1\"> <div class=\"b-step-1\"> <div class=\"b-container_addProblem-navbar\"> <ul class=\"b-addProblem-navbar\"> <li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=\"showFirst();\"> <img class=\"b-addProblem__img\" src=\"images/icons/map_marker_active.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 1</span> </li> <li class=\"b-addProblem-navbar__item\" ng-click=\"showSecond();\"> <img class=\"b-addProblem__img\" src=\"images/icons/info.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 2</span> </li> <li class=\"b-addProblem-navbar__item\" ng-click=\"showThird();\"> <img class=\"b-addProblem__img\" src=\"images/icons/add_photo.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 3</span> </li> </ul> </div> <div class=\"b-container__note\"> <img src=\"images/new.gif\" class=\"b-container__note-img\"/> <span class=\"b-container__note-text\">Відмітьте на карті місце розташування проблеми</span> </div> <div class=\"b-container__params\"> <span class=\"b-container__params-lantitle\">Latitude:</span> <input type=\"text\" class=\"b-container__params-lanvalue\" name=\"latitude\" ng-model=\"latitude\"/> <span class=\"b-container__params-lngtitle\">Longitude:</span> <input type=\"text\" class=\"b-container__params-lngvalue\" name=\"longitude\" ng-model=\"longtitude\"/> </div> <!-- <div class=\"b-step-1__btns-div\"> <input type=\"button\" ng-click=\"nextButton_Step1()\" class=\"b-add-problem-button btn-forward-step-1 btn-float-right\" value=\"Далі\" /> </div> --> <div class=\"b-crear-float\"></div> </div> </div> <div style=\"display:block\" class=\"b-add-problem__step-2\" ng-show=\"showStep_2\"> <div class=\"b-step-2\"> <div class=\"b-container_addProblem-navbar\"> <ul class=\"b-addProblem-navbar\"> <li class=\"b-addProblem-navbar__item\" ng-click=\"showFirst();\"> <img class=\"b-addProblem__img\" src=\"images/icons/map_marker.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 1</span> </li> <li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=\"showSecond();\"> <img class=\"b-addProblem__img\" src=\"images/icons/info_active.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 2</span> </li> <li class=\"b-addProblem-navbar__item\" ng-click=\"showThird();\"> <img class=\"b-addProblem__img\" src=\"images/icons/add_photo.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 3</span> </li> </ul> </div> <div class=\"b-step-2__title\"> <label class=\"b-add-problem-row-content\" id=\"b-note__title\" for=\"title-field\">Назва проблеми:</label> <span class=\"b-note__symbols\">(залишилось 70 символів)</span> <input type=\"text\" id=\"title-field\" name=\"title\" maxlength=\"70\" class=\"b-add-problem-row-content input_class\" required> </div> <div class=\"b-step-2__select\"> <label class=\"b-add-problem-row-content\" for=\"select-field\">Тип проблеми:</label> <select name=\"type\" id=\"select-field\" class=\"input_class\" required> <option value=\"\"></option> <option value=\"1\">Проблеми лісів</option> <option value=\"2\">Сміттєзвалища</option> <option value=\"3\">Незаконна забудова</option> <option value=\"4\">Проблеми водойм</option> <option value=\"5\">Загрози біорізноманіттю</option> <option value=\"6\">Браконьєрство</option> <option value=\"7\">Інші проблеми</option> </select> </div> <div class=\"b-step-2__textarea\"> <label class=\"b-add-problem-row-content\" for=\"description-field\">Опис проблеми:</label> <span class=\"b-note__symbols\">(залишилось 500 символів)</span> <textarea id=\"description-field\" name=\"content\" rows=\"10\" required></textarea> </div> <!-- <div class=\"b-step-2__btns-div\"> <input type=\"button\" class=\"b-add-problem-button btn-backward-step-2 btn-float-left\" ng-click=\"backButton_Step2()\" value=\"Назад\"> <input type=\"button\" class=\"b-add-problem-button btn-forward-step-2 btn-float-right\" ng-click=\"nextButton_Step2()\" value=\"Далі\"> </div> --> <div class=\"b-crear-float\"></div> </div> </div> <div class=\"b-add-problem__step-3\" ng-show=\"showStep_3\"> <div class=\"b-step-3\"> <div class=\"b-container_addProblem-navbar\"> <ul class=\"b-addProblem-navbar\"> <li class=\"b-addProblem-navbar__item\" ng-click=\"showFirst();\"> <img class=\"b-addProblem__img\" src=\"images/icons/map_marker.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 1</span> </li> <li class=\"b-addProblem-navbar__item\" ng-click=\"showSecond();\"> <img class=\"b-addProblem__img\" src=\"images/icons/info.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 2</span> </li> <li class=\"b-addProblem-navbar__item b-addproblem-navbar__item_active\" ng-click=\"showThird();\"> <img class=\"b-addProblem__img\" src=\"images/icons/add_photo_active.png\" /> <span class=\"b-addproblem-navbar__title\">Крок 3</span> </li> </ul> </div> <div class=\"b-step-3__dropzone\"> <div class=\"previews\"> <p> <span class=\"b-conteiner__drop-title-1\"><strong>+ Drop files</strong> to upload</span> </p> <span class=\"b-conteiner__drop-title-2\">(or click)</span> </div> </div> <div class=\"b-add-problem-row-for-buttons\"> <p class=\"b-note\">Щоб додати проблему анонімно - натисніть \"Опублікувати\".</p> <p>Ви можете <a href=\"\" id=\"btn-join-us\" ng-click=\"showRegisterForm()\">зареєструватись</a>, або авторизуватися через соціальнк мережу, щоб інформація про автора збереглася при публікації проблеми.</p> <a href=\"#\" ng-click=\"logInFB()\" class=\"b-fb-link\" title=\"Facebook\"></a> <a href=\"#\" class=\"b-gp-link\" title=\"Google+\"></a> <a href=\"#\" class=\"b-vk-link\" title=\"Вконтакте\"></a> <a href=\"#\" class=\"b-tw-link\" title=\"Twitter\"></a> </div> <div class=\"b-add-problem-new_user\" ng-show=\"showRegForm\"> <div class=\"b-add-problem-row-new_user-left\" required> <label class=\"b-add-problem-new_user-label text_class\" for=\"login-field\">Login</label> <input type=\"text\" id=\"login-field\" name=\"login\" class=\"b-add-problem-row_input input_class\"> </div> <div class=\"b-add-problem-row-new_user-right\"> <label class=\"b-add-problem-new_user-label text_class\" for=\"email-field\">Email</label> <input type=\"email\" id=\"email-field\" name=\"email\" class=\"b-add-problem-row_input input_class\"> </div> <div class=\"b-add-problem-row-new_user-left\"> <label class=\"b-add-problem-new_user-label text_class\" for=\"password-field\">Password</label> <input type=\"password\" id=\"password-field\" name=\"password\" class=\"b-add-problem-row_input input_class\"> </div> <div class=\"b-add-problem-row-new_user-right\"> <label class=\"b-add-problem-new_user-label text_class\" for=\"password2-field\">Confirm password</label> <input type=\"password\" id=\"password2-field\" name=\"password\" class=\"b-add-problem-row_input input_class\"> </div> <div class=\"b-crear-float\"></div> </div> <input id=\"btn-submit\" type=\"button\" class=\"b-add-problem-button btn-forward-step-3 b-public\" value=\"Опублікувати\"> <div class=\"b-crear-float\"></div> <!-- <div class=\"b-step-3__btns-div\"> <input type=\"button\" class=\"b-add-problem-button btn-backward-step-3 btn-float-left\" value=\"Назад\" ng-click=\"backButton_Step3()\"> <input id=\"btn-submit\" type=\"button\" class=\"b-add-problem-button btn-forward-step-3 btn-float-right\" value=\"Опублікувати\"> <div class=\"b-crear-float\"></div> </div> --> <div class=\"b-crear-float\"></div> </div> </div> </form> </div> ","AdminPage":"<div class=\"b-wrapper-inside-blocks\"> <a href=\"#/map\" class=\"close\">×</a> <!-- left block - filters START --> <div class=\"b-filters\"> ФІЛЬТР ПО ТИПАМ ПРОБЛЕМ <form method=\"\" action=\"\" id=\"ecoProblem\"></form> ФІЛЬТРИ ДЛЯ АДМІНІСТРАТОРА <!-- <div ng-controller=\"ButtonsCtrl\"> --> <!-- </div> --> </div> <!-- header block END --> <!-- ---------------- --> <!-- central block - problem list START --> <div class=\"b-problem-list\" ng-show=\"blockVisible\"> <!--<div class=\"b-problem-list__list\"> --> <div class=\"b-problem-list__caption\"> СПИСОК НОВИХ ПРОБЛЕМ </div> <ul class=\"b-problem-list-items\" ng-show=\"infoVisible\"> <li class=\"b-problem-list-item\" ng-repeat=\"problem in problems\"> <div class=\"b-problem-list-item__created\" ng-hide=\"compareDate($index)\"> {{problem.created|date:'shortDate'}} </div> <div class=\"b-problem-list-item__title\" ng-click=\"getDeatiledProblemInfo($index)\"> <a href=\"\" class=\"b-problem-list-item__link\">{{problem.title}}</a> </div> </li> </ul> <!--</div> --> </div> <!-- ---------------- --> <!-- central block - problem list END --> <!-- right block - detailed problem START --> <div class=\"b-problem-deatiled-info\" ng-show=\"v_DeatiledProblemInfo\"> <div class=\"b-problem-deatiled-info-header\"> <form method=\"\" action=\"\" class=\"b-problem-deatiled-info-form\"> <input type=\"button\" value=\"Редагувати\" class=\"b-problem-deatiled-info_edit\"> <input type=\"button\" value=\"Видалити\" class=\"b-problem-deatiled-info_delete\"> </form> <div class=\"b-problem-deatiled-info-title\"> <img src=\"images/icons/waste_icon.png\" class=\"b-problem-deatiled-info-title__icon\"> <div class=\"b-problem-deatiled-info-title__text\">{{problems[problemId].title}}</div> <div class=\"b-problem-deatiled-info-user\"> <div class=\"b-problem-deatiled-info-user__name\">Василь</div> <div class=\"b-problem-deatiled-info-user__date\">{{problems[problemId].created|date:'shortDate'}}</div> </div> </div> <div class=\"b-problem-deatiled-info-general\"> <div class='b-problem-deatiled-info-severity'> <div class=\"b-problem-deatiled-info__caption\">Важливість</div> <div class=\"b-problem-deatiled-info__severity\" ng-controller=\"RatingCtrl\"> <rating ng-model=\"rate\" max=\"max\" readonly=\"isReadonly\" on-hover=\"hoveringOver(value)\" on-leave=\"overStar = null\"> </rating> </div> </div> <div class=\"btn-group b-problem-deatiled-info__status\"> <div class=\"b-problem-deatiled-info-status__text\">Status</div> <div class=\"onoffswitch\"> <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" checked> <label class=\"onoffswitch-label\" for=\"myonoffswitch\"> <span class=\"onoffswitch-inner\"></span> <span class=\"onoffswitch-switch\"></span> </label> </div> </div> <div class=\"b-problem-deatiled-info-votes\"> <!--<img class='b-problem-deatiled-info__votes' src='images/icons/heart.jpg'> --> <span class=\"glyphicon glyphicon-heart\"></span> {{problems[problemId].votes}} </div> </div> </div> <div class=\"b-problem-deatiled-info-description\"> <div class=\"b-problem-deatiled-info-description__title\">Детально</div> <div class=\"b-problem-deatiled-info-description__content\">{{problems[problemId].content}}</div> <div class=\"b-problem-deatiled-info-description-photos\"> <img src=\"images/icons/noImage_icon.png\" class=\"b-problem-deatiled-info-description-photos__photo\"> <img src=\"images/icons/noImage_icon.png\" class=\"b-problem-deatiled-info-description-photos__photo\"> <img src=\"images/icons/noImage_icon.png\" class=\"b-problem-deatiled-info-description-photos__photo\"> <img src=\"images/icons/noImage_icon.png\" class=\"b-problem-deatiled-info-description-photos__photo\"> <img src=\"images/icons/noImage_icon.png\" class=\"b-problem-deatiled-info-description-photos__photo\"> </div> </div> <div class=\"b-problem-deatiled-info-userComments\"> <div class=\"b-problem-deatiled-info-userComments__title\">Коментарі користувачів</div> <div class=\"b-problem-deatiled-info-userCommentsList\"> <div class=\"b-problem-deatiled-info-userCommentList__item\"> <div class=\"b-problem-deatiled-info-userComment__userName\">Василь Петрович</div> <div class=\"b-problem-deatiled-info-userComment__date\">24.04.13 о 23:15</div> <div class=\"b-problem-deatiled-info-userComment__activityType\"></div> </div> <div class=\"b-problem-deatiled-info-userComment__content\">Повідомив про проблему</div> </div> <div class=\"b-problem-deatiled-info-userCommentsList\"> <div class=\"b-problem-deatiled-info-userCommentList__item\"> <div class=\"b-problem-deatiled-info-userComment__userName\">Петро</div> <div class=\"b-problem-deatiled-info-userComment__date\">05.07.13 о 23:15</div> <div class=\"b-problem-deatiled-info-userComment__activityType\"></div> </div> <div class=\"b-problem-deatiled-info-userComment__content\">Друзі, Всіх небайдужих запрошуємо долучитися до прибирання в міському парку ім. Л.Українки</div> </div> </div> </div> <!-- ---------------- --> <!-- central block - problem list END --> <div class=\"b-empty-bottom\"> </div> </div> ","Chat":"<div class='b-chat__container'> <a href=\"#/map\" class=\"close\">×</a> <div class=\"b-chat__currentNews\"> <h3 style=\"text-align: center\">Новини що відображаються зараз на сайті: </h3> <ul class=\"b-chat__newsItem\" ng-repeat=\"news in messageLogs\"> <li class=\"b-chat__newsItem-li\">{{news.Content}}</li> <i class=\"fa fa-close b-chat__newsItem-li-i\" ng-click=\"sendMessage($index+1)\"></i> </ul> </div> <form role='form' novalidate name='form'> <!-- <input type=\"text\" ng-model=\"userId\" name=\"userId\" style=\"display:none\"> <input type=\"text\" ng-model=\"id\" name=\"problemId\" style=\"display:none\"> <div style='width: 100%;cursor: pointer; height: 400px; font-size:20px ' class=\"chatField\" ng-model='messageLog'>{{messageLog}}</div>--> <div class='form-group'> <span class=\"b-chat-comment__title\">Додати повідомлення</span> <textarea class=\"b-chat-comment__field\" ng-model=\"message\" placeholder=\"Напишіть тут свій коментар...\"></textarea> <input type=\"button\" class=\"b-chat-comment__btn\" ng-enable='form.$valid' ng-click=\"sendMessage(message)\" value=\"Додати\"/> </div> </form></div>","EditorPage":"<a href=\"#/map\" class=\"close\">×</a><form class=\"editor\" name=\"EditForm\"><div class=\"editor_horizontal\"> <div class=\"editor_left\"> <label >Заголовок ресурсу: </label> <input type=\"text\" name=\"Title\" ng-model=\"Title\" required> </div> <div class=\"editor_right\"> <label>Alias для ресурсу: </label> <input type=\"text\" ng-model=\"Alias\" name=\"Alias\" required ng-pattern=\"/^[0-9a-zA-Z\\-]+$/\"> <span ng-if=\"EditForm.Alias.$error.pattern\">Це поле може містити лише латинські літери, цифри та символ \"-\" !</span> </div></div><div class=\"editor_horizontal\"> <div text-angular=\"text-angular\" ta-toolbar=\"[['h2', 'h3', 'h4', 'p', 'pre', 'quote'],['bold', 'italics', 'underline', 'ul', 'ol', 'clear'],['justifyLeft','justifyCenter','justifyRight'],\t['html', 'insertImage', 'insertLink', 'insertVideo']]\" name=\"htmlontent\" ng-model=\"Content\" class=\"editor_ta\"></div></div><div class=\"editor_horizontal\"> <div class=\"editor_left\"> <label>Де розмістити цей ресурс: </label> <select ng-model=\"IsResource\" name=\"IsResource\" required> <option value=\"0\">У верхньому меню</option> <option value=\"1\" selected>В розділі \"Ресурси\"</option> </select> </div> <div class=\"editor_right\"> <button type=\"submit\" class=\"b-form__button editor_btn\" type=\"submit\" ng-click=\"sendResource(Alias, Content, Title, IsResource, Id)\">Відправити</button> </div></div></form>","Filters":"<div class=\"b-container-filters-left\"> <div class=\"info-problem-filters\"> <div class=\"problem filters\"> <p class=\"title\">ТИП ПРОБЛЕМ</p> <input ng-repeat-start=\"problemType in problemTypes\" id=\"{{'type' + problemType.id}}\" type=\"checkbox\" ng-model=\"problemType.selected\" ng-change=\"toggleSelection()\"> <label ng-repeat-end for=\"{{'type' + problemType.id}}\">{{problemType.name}}</label> </div> <div class=\"problem status\"> <p class=\"title\">СТАТУС ПРОБЛЕМ</p> <input ng-repeat-start=\"problemStatus in problemStatuses\" id=\"{{'status' + problemStatus.id}}\" type=\"checkbox\" ng-model=\"problemStatus.selected\" ng-change=\"toggleSelection()\"> <label ng-repeat-end for=\"{{'status' + problemStatus.id}}\">{{problemStatus.name}}</label> </div> <div class=\"problem controls\" ng-show='isLoggedIn()'> <input id = \"userProblems\" type = \"checkbox\" ng-model=\"placeUserProblemsChecker\" ng-change=\"toggleSelection()\"> <label for= \"userProblems\">Відобразити мої</label> </div> <div class=\"problem stats\"> <p class=\"title\">STATS</p> <li>Кількість проблем</li> <li>Останні проблеми</li> <li>Популярні проблеми</li> </div> </div> </div> ","Map":"<div class=\"b-view\"> Hello, my dear friend! </div> ","Navbar":"<nav class=\"navbar navbar-default b-header\" role=\"navigation\"> <div class=\"container-fluid\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle\" ng-init=\"navCollapsed = true\" ng-click=\"navCollapsed = !navCollapsed\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <img src=\"images/logo.png\" class=\"b-header__logo\" /> <a class=\"navbar-brand b-menu__button\" href=\"#/problem/addProblem\" ng-click=\"addProblem()\">Повідомити про проблему</a> </div> <div class=\"collapse navbar-collapse\" ng-class=\"!navCollapsed && 'in'\" ng-init=\"getTitles()\"> <ul class=\"nav navbar-nav\"> <li ng-repeat=\"title in data\" ng-if=\"!title.IsResource\" class=\"b-menu__button\"> <a id=\"link\" href=\"#/resources/{{title.Alias}}\">{{title.Title}} </a> <i class=\"fa fa-pencil fa-xs\" ng-if=\"isAdministrator()\" ng-click=\"editResource(title.Alias)\"></i> <i class=\"fa fa-trash fa-xs\" ng-if=\"isAdministrator()\" ng-click=\"deleteResource(title.Id)\"></i> </li> <li class=\"dropdown\"> <a href=\"#\" class=\"dropdown-toggle b-menu__button\">Ресурси <span class=\"fa fa-caret-down\"></span> </a> <ul class=\"dropdown-menu\" id=\"b-header__resources\"> <li ng-repeat=\"title in data\" ng-if=\"title.IsResource\"> <a id=\"link\" href=\"#/resources/{{title.Alias}}\">{{title.Title}}</a> <i class=\"fa fa-pencil\" ng-if=\"isAdministrator()\" ng-click=\"editResource(title.Alias)\"></i> <i class=\"fa fa-trash\" ng-if=\"isAdministrator()\" ng-click=\"deleteResource(title.Id)\"></i> </li> <li ng-if=\"isAdministrator()\"> <a href=\"#/addResource\" class=\"b-menu__button\"><i class=\"fa fa-plus\"></i> Додати новий ресурс</a> </li> </ul> </li> <li class=\"dropdown\" ng-hide=\"isLoggedIn()\"> <a class=\"dropdown-toggle b-menu__button\" href=\"#\">Вхід <span class=\"fa fa-caret-down\"></span> </a> <ul class=\"dropdown-menu\" id=\"b-header__login-menu\" stop-event=\"click\"> <li> <form name=\"login\"> <div class=\"form-group\"> <input type=\"text\" class=\"form-control\" name=\"email\" required placeholder=\"Email\"> </div> <div class=\"form-group\"> <input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"Пароль\"> </div> <button type=\"submit\" value=\"Вхід\" ng-click=\"postLogIn()\" class=\"btn btn-default b-menu__button\" id=\"login-button\">Вхід</button> <div class=\"divider\"></div> <button class=\"btn btn-default\" id=\"loginfb\" href=\"#\" ng-click=\"logInFB()\"><i class=\"fa fa-facebook-square fa-lg\"></i> Вхід</button> <button class=\"btn btn-default\" id=\"register-button\" href=\"#\" ng-click=\"open('')\">Реєстрація</button> </form> </li> </ul> </li> <li ng-if=\"isLoggedIn()\"> <a class=\"b-menu__button\" ng-href=\"#/chat\" ng-click=\"showChat()\"><i class=\"fa fa-weixin\"></i> Чат</a> </li> <li> <user></user> </li> </ul> <ul class=\"nav navbar-nav navbar-right\" ng-show=\"isLoggedIn()\"> <li class=\"dropdown\"> <a class=\"dropdown-toggle b-menu__button\"><i class=\"fa fa-user\"></i> {{name}} {{surname}} <span class=\"fa fa-caret-down\"></span> </a> <ul class=\"dropdown-menu\"> <li><a class=\"b-menu__button\" ng-click=\"logOut()\" href=\"/\"><i class=\"fa fa-sign-out\"></i> Вийти</a></li> </ul> </li> </ul> </div> </div></nav>","NotApproved":"<div class=\"b-new-problem-list\" ng-controller=\"notApprovedCtrl\" ng-if=\"isAdministrator()\" ng-hide=\"!notApproved.length\"> <div class=\"b-new-problem-list__caption\"> СПИСОК НОВИХ ПРОБЛЕМ </div> <ul class=\"b-new-problem-list-items\"> <li class=\"b-new-items__item\" ng-repeat=\"problem in notApproved\"> <div class=\"b-new-item__title\" ng-click=\"showProblem(problem)\">{{problem.Title}}</div> <div class=\"b-new-item__buttons\"> <ul class=\"b-buttons\"> <li class=\"b-buttons__button fa fa-check\" ng-click=\"approveProblem(problem)\"></li> <li class=\"b-buttons__button fa fa-pencil\" ng-click=\"editProblem(problem)\"></li> <li class=\"b-buttons__button fa fa-remove\" ng-click=\"deleteProblem(problem)\"></li> </ul> </div> </li> </ul></div>","Rating":"<div> <span ng-mouseleave=\"reset()\"> <i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < val && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\"></i> </span> </div>","Register":"<alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert><div class=\"modal-header\"> <h3 class=\"modal-title\">Реєстрація нового користувача:</h3></div><div class=\"modal-body\"> <form method=\"post\" action=\"http://localhost:8090/api/register\" class=\"b-registration__form\" name=\"registerForm\"> <div class=\"form-group\"> <label for = \"first_name\">Ім’я</label> <input type=\"text\" id = \"first_name\" class=\"form-control\" name=\"first_name\" required> </div> <div class=\"form-group\"> <label for = \"last_name\">Прізвище</label> <input type=\"text\" id = \"last_name\" class=\"form-control\" name=\"last_name\" required> </div> <div class=\"form-group\"> <label for = \"email\">Пошта</label> <input type=\"email\" id = \"email\" class=\"form-control\" name=\"email\" required> </div> <div class=\"form-group\"> <label for = \"password\">Пароль</label> <input type=\"password\" id = \"password\" class=\"form-control\" name=\"password\" required> </div> <div class=\"form-group\"> <label for = \"password_second\">Повторіть пароль</label> <input type=\"password\" id = \"password_second\" class=\"form-control\" name=\"password_second\" required> </div> <div class=\"modal-footer\"> <input type=\"button\" value=\"Зареєструватися!\" class=\"b-form__button\" ng-click=\"registerNewUser()\" /> </div> </form></div>","Resources":"<div class=\"resource\"><a href=\"#/map\" class=\"close\">×</a><h1 ng-bind-html=\"resource.Title\"></h1><div ta-bind ng-model=\"resource.Content\"></div></div>","ShowProblem":"<div class=\"b-right-side__show-problem\"> <div class=\"b-editproblemctr\" > <a href=\"#/map\" class=\"close\">×</a> </div> <div class=\"b-problems\" ><!-- Часть для вставки / начало --> <div class=\"b-problem-deatiled-info-title\"> <img ng-src=\"images/markers/{{data.ProblemTypes_Id}}.png\" class=\"b-problem-deatiled-info-title__icon\"> <div class=\"b-problem-deatiled-info-title__text\"> <editproblemtitle value=\"title\" ></editproblemtitle> </div> <div class=\"b-problem-deatiled-info-user\"> <div class=\"b-problem-deatiled-info-user__name\"> {{userName}} </div> <div class=\"b-problem-deatiled-info-user__date\"> {{createdDate | date:'dd/MM/yyyy HH:MM'}} </div> </div> </div> <div class=\"b-problem-deatiled-info-general\"> <div class='b-problem-deatiled-info-severity'> <div class=\"b-problem-deatiled-info__caption\"> Важливість</div> <div class=\"b-problem-deatiled-info__severity\" ng-init=\"severity\"> <rating ng-model=\"severity\" readonly=\"!isAdministrator()\" state-on=\"'fa-star'\" state-off=\"'fa-star-o'\"></rating> </div> </div> <div class=\"btn-group b-problem-deatiled-info__status\"> <div class=\"b-problem-deatiled-info-status__text\">{{status}}</div> <div class=\"onoffswitch\"> <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\"myonoffswitch\" ng-false-value=\"Активна\" ng-true-value=\"Вирішена\" ng-model=\"status\" ng-disabled=\"!isAdministrator()\" > <label class=\"onoffswitch-label\" for=\"myonoffswitch\"> <span class=\"onoffswitch-inner\"></span> <span class=\"onoffswitch-switch\"></span> </label> </div> </div> <div class=\"b-problem-deatiled-info-votes\"> <!--<img class='b-problem-deatiled-info__votes' src='images/icons/heart.jpg'> --> <button class=\"simple_like_img\" ng-click=\"addOneVote()\" ng-disabled=\"disableVoteButton\"> <span ><i class=\"fa fa-fw\"></i></span> </button> {{data.Votes}} </div> </div> <tabset justified=\"true\" class=\"b-problem-tab\"> <tab heading=\"Детально\" > <div class=\"b-problem-deatiled-info-description\"> <div class=\"b-problem-deatiled-info-description__title\"></div> <div class=\"b-problem-deatiled-info-description__content\"> <editproblemcontent value=\"content\"></editproblemcontent> </div> <div class=\"b-problem-deatiled-info-description-photos\"> <div class=\"show_photo\" ng-repeat=\"photo in photos\"> <img ng-click=\"showSliderFunc()\" ng-src=\"photos/large/{{photo.Link}}\" class=\"b-details-body-problem-photo\"/> <div class=\"show_photo_label_{{photo.Status}}\"></div> </div> <div class=\"b-details-body-problem-photo_add\" ng-click=\"showDrop()\" ng-show=\"showAddPhotoButton\">+ Додати фото</div> <form id=\"addPhotoDropzone\" class=\"dropzone b-add-problem-form\" name=\"upload_photo\" drop=\"dropzoneConfig\" ng-show=\"showDropField\"> <input type=\"text\" style=\"display: none\" ng-model=\"userId\" name=\"userId\"/> <input type=\"text\" style=\"display: none\" ng-model=\"name\" name=\"userName\"/> <div class=\"previews previews_show\" > <p> <span class=\"b-conteiner__drop-title-1\"><strong>+ Перемістить сюди фото </strong>для завантаження</span> </p> <span class=\"b-conteiner__drop-title-2\">(або натисніть)</span> </div> <div class=\"b-details-body__status\"> Проблема вже вирішена? <br>Так <input type=\"radio\" name=\"solveProblemMark\" value=\"1\"> Ні<input type=\"radio\" name=\"solveProblemMark\" value=\"0\"> </div> <input id=\"btn-submit\" type=\"button\" class=\"b-add-problem-button btn-forward-step-3 b-public\" value=\"Додати\"> <input id=\"btn-reload\" type=\"button\" ng-click=\"hideAddPhotoForm()\" class=\"b-add-problem-button btn-forward-step-3 b-public\" value=\"Звернути\"> </form> </div> </div> </tab> <tab heading=\"Коментарі користувачів\"> <activity></activity> </tab> </tabset> <button type=\"button\" class=\"btn {{editStatus}} btn-sm\" ng-click=\"saveChangestoDb(data.Title,severity, status, content)\" >Збережіть зміни</button> <a href=\"#/\"><button type=\"button\" class=\"btn {{delStatus}} btn-sm\" ng-click=\"deleteProblemFromDb()\" >Видалити проблему з бази</button></a> </div></div>","Slider":" <div class=\"container slider\" ng-show=\"showSlider\"> <a href=\"\"class=\"close\" style=\"top:0px; right:0px;z-index: 5\" ng-click=\"hideSlider()\">x</a><img ng-repeat=\"photo in photos\" class=\"slide slide-animation nonDraggableImage\" ng-swipe-right=\"nextSlide()\" ng-swipe-left=\"prevSlide()\" ng-hide=\"!isCurrentSlideIndex($index)\" ng-src=\"../photos/large/{{photo.Link}}\"> <a class=\"arrow prev\" ng-click=\"nextSlide()\"></a><a class=\"arrow next\" ng-click=\"prevSlide()\"></a><nav class=\"navSlider\"> <div class=\"wrapper\"> <ul class=\"dots\"> <li class=\"dot\" ng-repeat=\"photo in photos\"> <a ng-class=\"{'active':isCurrentSlideIndex($index)}\" ng-click=\"setCurrentSlideIndex($index);\">{{photo.description}}</a></li> </ul> </div></nav></div>","UserChatLine":"<div ng-show=\"showNewsContainer\" class=\"chat-user-label\"><!--<div ng-repeat=\"messageLog in messageLogs\" ng-style={display:messageLog.show} class=\"chat-user-label{{messageLogHide}}\">{{messageLog.Content}}</div>--> <marquee>{{allNews}}</marquee> <i class=\"fa fa-close close\" ng-click=\"showNewsContainer=false\"></i></div>"}