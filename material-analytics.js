"use strict";function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var appModule=angular.module("material-analytics",["ui.router","material-analytics-ecommerce"]).run(["$window","$rootScope","$location","analyticsConfig",function(e,a,t,r){e.test=1,e.dataLayer=e.dataLayer||[],a.$on("$stateChangeSuccess",function(a,n,o){var c=t.path();e.dataLayer.push({event:"virtualPageView",virtualPage:c,virtualTitle:n.name,tenantID:r.getTenantId()})})}]),_createClass=function(){function e(e,a){for(var t=0;t<a.length;t++){var r=a[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(a,t,r){return t&&e(a.prototype,t),r&&e(a,r),a}}(),AnalyticsConfigProvider=function(){function e(){_classCallCheck(this,e),this.tenantId=""}return _createClass(e,[{key:"setTenantId",value:function(e){this.tenantId=e}},{key:"$get",value:function(){var e=this;return{getTenantId:function(){return e.tenantId}}}}]),e}();angular.module("material-analytics").provider("analyticsConfig",AnalyticsConfigProvider),angular.module("material-analytics-ecommerce",["ngLodash"]).run(["$rootScope","$window","maProductImpressions","maCartEvents","maProductDetailsImpressions","maCheckoutTracker","maPurchaseTracker",function(e,a,t,r,n,o,c){a.dataLayer=a.dataLayer||[],a.ga&&a.ga("require","ec"),e.$on("ProductListLoaded",function(e,a,r){t.send(a,r)}),e.$on("ProductDetailLoaded",function(e,a,t){n.send(a,t)}),e.$on("CartEvents.ItemAdded",function(e,a,t,n){r.logAddItemToCart(a,t,n)}),e.$on("CartEvents.ItemRemoved",function(e,a,t){r.logRemoveItemFromCart(a,t)}),e.$on("CheckoutEvents.StepCompleted",function(e,a,t,r){o.logCheckoutStep(a,t,r)}),e.$on("CheckoutEvents.OrderPlaced",function(e,a){c.logPurchase(a)})}]),angular.module("material-analytics-ecommerce").factory("maCartEvents",["$window","maProductPayload",function(e,a){return{logAddItemToCart:function(t,r,n){var o=void 0,c=void 0,i=a.create(t,n,o,c,r);e.dataLayer.push({event:"addToCart",ecommerce:{add:{products:[i]}}})},logRemoveItemFromCart:function(t,r){var n=void 0,o=void 0,c=void 0,i=a.create(t,c,n,o,Math.abs(r));e.dataLayer.push({event:"removeFromCart",ecommerce:{remove:{products:[i]}}})}}}]),angular.module("material-analytics-ecommerce").factory("maCheckoutTracker",["$window","maCartPayload",function(e,a){return{logCheckoutStep:function(t,r,n){e.dataLayer.push({event:"checkout",ecommerce:{checkout:{actionField:{step:t,option:r},products:a.extractProducts(n)}}})}}}]),angular.module("material-analytics-ecommerce").factory("maCartPayload",function(){return{extractProducts:function(e){var a=e.items,t=a.map(function(e){var a=e.product,t=e.quantity;return{name:a.name,id:a.sku,price:a.price,quantity:t}});return t}}}),angular.module("material-analytics-ecommerce").factory("maProductPayload",function(){return{create:function(e,a,t,r,n){var o=e.sku,c=e.name,i=e.price,u={name:c,id:o,price:i,category:a};return angular.isDefined(t)&&(u.list=t),isFinite(r)&&(u.position=r),isFinite(n)&&(u.quantity=n),u}}}),angular.module("material-analytics-ecommerce").directive("maProductClickTracker",["$window","maProductPayload",function(e,a){return{restrict:"A",scope:{product:"=maProductClickTracker",productCategory:"@",productPosition:"@"},link:function(t,r){var n=function(){var r=void 0,n="",o=void 0;angular.isDefined(t.productPosition)&&isFinite(parseInt(t.productPosition,10))&&(o=parseInt(t.productPosition)),angular.isString(t.productCategory)&&t.productCategory.length>0&&(n="Category");var c=a.create(t.product,t.productCategory,r,o);e.dataLayer.push({event:"productClick",ecommerce:{click:{actionField:{list:n},products:[c]}}})};r.on("click",n),t.$on("$destroy",function(){r.off("click",n)})}}}]),angular.module("material-analytics-ecommerce").factory("maProductDetailsImpressions",["$window","lodash","maProductPayload",function(e,a,t){return{send:function(a){var r=arguments.length<=1||void 0===arguments[1]?"":arguments[1],n=t.create(a,r);e.dataLayer.push({ecommerce:{detail:{products:[n]}}})}}}]),angular.module("material-analytics-ecommerce").factory("maProductImpressions",["$window","lodash","maProductPayload",function(e,a,t){return{send:function(r){var n=arguments.length<=1||void 0===arguments[1]?"":arguments[1],o=a.map(r,function(e,a){var r=(e.name,e.id,e.price,"");return""!==n&&(r="Category"),t.create(e,n,r,a+1)});e.dataLayer.push({ecommerce:{impressions:o}})}}}]),angular.module("material-analytics-ecommerce").factory("maPurchaseTracker",["$window","maCartPayload",function(e,a){return{logPurchase:function(t){e.dataLayer.push({ecommerce:{purchase:{actionField:{id:t.orderNumber,affiliation:"Online Store",revenue:t.grandTotal,tax:t.taxAmount,shipping:t.cart.shippingMethod.shippingCost},products:a.extractProducts(t.cart)}}})}}}]);