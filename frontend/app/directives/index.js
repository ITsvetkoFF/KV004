/** attach directives to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define([
    './dropzone-directive',
    './chat-directive',
    './activity-directive',
    './chatUser-directive',
	'./editProblemTitle',
    './editProblemContent',
    './stopEvent-directive',
    './problemFilters-directive',
    './notApproved-directive',
    './slider-directive',
    './closeBut',
    './editProblemProposal',
    './goClick'



], function () {});