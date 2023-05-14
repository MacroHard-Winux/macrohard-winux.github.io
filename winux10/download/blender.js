var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var WebBlender = function ($) {
    var messageHandlers = [];

    /**
      Processes post messages.
      @private
    */
    var processMessage = function (event) {
        for (var i = 0; i < messageHandlers.length; i++) {
            messageHandlers[i](event.originalEvent || event);
        }
    };

    $(window).on("message", processMessage);

    var parentElement;
    var htmlFetched = false;

    /**
      Gets webblend url.
      @private
    */
    var getUrl = function (environment, path, client, flight, fragment) {
        var env = environment && environment.toLowerCase && environment.toLowerCase() || '';
        var format = 'https://{host}/webblend{path}{client}{flight}{fragment}';
        var host;
        switch (env) {
            case "dev":
                host = 'onestore.dev.microsoft.com';
                break;
            case "int":
                host = 'unistorefd-int.www.microsoft.com';
                break;
            case "ppe":
                host = 'unistorefd-ppe.www.microsoft.com';
                break;
            case "prod":
            default:
                host = 'www.microsoft.com';
                break;
        }

        var url = format
            .replace('{host}', host)
            .replace('{path}', path || '')
            .replace('{client}', client && $.trim(client) ? '?client=' + client : '')
            .replace('{flight}', flight && $.trim(flight) ? (client && $.trim(client) ? '&setflight=' : '?setflight=') + flight : '')
            .replace('{fragment}', fragment || '');

        return url;
    };

    /**
      Primarily used from tests so that each test can reset the flag and re-fetch html.
      @public
      @method resetHtmlFetched
      @for WebBlender
    */
    var resetHtmlFetched = function (htmlFetch) {
        htmlFetched = htmlFetch;
    };

    /**
      Generates the form that will post to the blend.
      @private
    */
    var getForm = function (formContainer, iframeName, url, postBody) {
        var formId = 'wb_auto_form_container';
        var form = $('#' + formId);
        if (form.length) {
            form.remove();
        }
        form = $('<form></form>');
        form.attr('action', url);
        form.attr('target', iframeName);
        form.attr('method', 'post');
        form.attr('id', formId);
        $.each(postBody, function (key, val) {
            if (postBody.hasOwnProperty(key)) {
                var result = $('<input type="hidden" />');
                result.attr('name', key);
                result.attr('value', val);
                form.append(result);
            }
        });
        formContainer.append(form);

        return form;
    };

    /**
      Generates the iframe that will host the blend.
      @private
    */
    var getBlendFrame = function (frameContainer, dimensions) {
        var frameId = 'wb_auto_blend_container';
        var frame = $('#' + frameId);
        var width = dimensions && dimensions.width || '456px';
        var height = dimensions && dimensions.height || '420px';

        if (frame.length) {
            frame.css({ height: height, width: width });
        }
        else {
            frame = $('<iframe />', {
                id: frameId,
                name: frameId,
                src: '',
                style: 'width:{width}; height:{height}; position:relative; top:0; left:0; border:0; outline:none; display:block; z-index: 3000'.replace('{width}', width).replace('{height}', height)
            });

            frame.appendTo(frameContainer);
        }
        return frame;
    };

    /**
      Loads the blend.
      @private
    */
    var openBlend = function (postBody, parentElementId, environment, flight, clientType, hash, iframeOptions) {
        if (!htmlFetched) {
            parentElement = $('#' + parentElementId);
            var url = getUrl(environment, null, clientType, flight, hash);

            var start = new Date().getTime();
            var blendContainer = getBlendFrame(parentElement, iframeOptions);
            var form = getForm(parentElement, blendContainer.attr('name'), url, postBody);
            form.submit();
            var stop = new Date().getTime();
            var span = stop - start;
            window.postMessage(JSON.stringify({ message: 'status', data: 'blenderSDK: Loaded in ' + span + 'ms' }), '*');
        }
    };

    /**
      Loads the Html for the purchase blend into a div child of the provided element.
      @public
      @method loadSingleItemPurchaseHtml
      @for WebBlender
      @param {availabilityId} availability id of product to add to new order (required)
      @param {productId} product id of product to add to new order (required)
      @param {skuId} sku id of product to add to new order (required)
      @param {options} campaign options (optional)
      @param {auth} authentication (required)
      @param {parentElementId} DOM element (e.g. div, span) into which Blends will be loaded (required)
      @param {environment} see resolveEnvironment for options (required)
      @param {flight} see wiki for options (optional)
      @param {clientType} see clientTypes (required)
      @param {culture} UI culture (required)
      @param {market} service market (required)
      @param {cv} correlation-vector (required)
      @param {identityType} auth identityType (optional)
      @param {identityValue} auth identityValue (optional)
      @param {mediaOptions} media-specific options (optional)
      @param {iframeOptions} object specifying desired width and height overrides of iframe (optional)
      @param {purchaseServiceVersion} string specifying desired version of purchase service to use. Will default if not supplied to oldest supported version (optional)
    */
    var loadSingleItemPurchaseHtml = function (availabilityId, productId, skuId, options, auth, parentElementId, environment, flight, clientType, culture, market, cv, identityType, identityValue, mediaOptions, iframeOptions, purchaseServiceVersion) {
        var postBody = {
            "AvailabilityId": availabilityId,
            "ProductId": productId,
            "SkuId": skuId,
            "Auth": auth,
            "Culture": culture,
            "Market": market,
            "CV": cv,
            "IdentityType": identityType,
            "IdentityValue": identityValue,
            "PurchaseServiceVersion": purchaseServiceVersion
        };

        if (options) {
            postBody["CampaignId"] = options.campaignId || "";
            postBody["OptionalCampaignId"] = options.optionalCampaignId || "";
        }

        if (mediaOptions) {
            postBody["ProductType"] = mediaOptions.productType || "";
            postBody["TransactionType"] = mediaOptions.transactionType || "buy";
            postBody["Title"] = mediaOptions.title || "";
            postBody["TitleNo"] = mediaOptions.titleNo || "";
            postBody["SubTitle1"] = mediaOptions.subTitle1 || "";
            postBody["SubTitle2"] = mediaOptions.subTitle2 || "";
            postBody["ExpirationBeforePlayInHours"] = mediaOptions.expirationBeforePlayInHours || "";
            postBody["ExpirationAfterPlayInHours"] = mediaOptions.expirationAfterPlayInHours || "";
        }

        openBlend(postBody, parentElementId, environment, flight, clientType, "#/purchase/confirm", iframeOptions);
    };

    /**
      Loads the Html for the purchase blend into a div child of the provided element.
      @public
      @method loadOrderPurchaseHtml
      @for WebBlender
      @param {orderId} order id (required)
      @param {auth} authentication (required)
      @param {parentElementId} DOM element (e.g. div, span) into which Blends will be loaded (required)
      @param {environment} see resolveEnvironment for options (required)
      @param {flight} see wiki for options (optional)
      @param {clientType} see clientTypes (required)
      @param {culture} UI culture (required)
      @param {market} service market (required)
      @param {cv} correlation-vector (required)
      @param {iframeOptions} object specifying desired width and height overrides of iframe (optional)
      @param {purchaseServiceVersion} string specifying desired version of purchase service to use. Will default if not supplied to oldest supported version (optional)
    */
    var loadOrderPurchaseHtml = function (orderId, auth, parentElementId, environment, flight, clientType, culture, market, cv, iframeOptions, purchaseServiceVersion) {
        var postBody = {
            "OrderId": orderId,
            "Auth": auth,
            "Culture": culture,
            "Market": market,
            "CV": cv,
            "PurchaseServiceVersion": purchaseServiceVersion
        };
        openBlend(postBody, parentElementId, environment, flight, clientType, "#/purchase/confirm", iframeOptions);
    };


    /**
      Loads the Html for the Add PI blend into a div child of the provided element.
      @public
      @method loadAddPaymentInstrumentHtml
      @for WebBlender
      @param {auth} authentication (required)
      @param {parentElementId} DOM element (e.g. div, span) into which Blends will be loaded (required)
      @param {environment} see resolveEnvironment for options (required)
      @param {flight} see wiki for options (optional)
      @param {clientType} see clientTypes (required)
      @param {culture} UI culture (required)
      @param {market} service market (required)
      @param {cv} correlation-vector (required)
      @param {iframeOptions} object specifying desired width and height overrides of iframe (optional)
*/
    var loadAddPaymentInstrumentHtml = function (auth, parentElementId, environment, flight, clientType, culture, market, cv, iframeOptions) {
        var postBody = {
            "Auth": auth,
            "Culture": culture,
            "Market": market,
            "CV": cv
        };
        openBlend(postBody, parentElementId, environment, flight, clientType, "#/paymentAndBilling/choosePaymentMethodFamily", iframeOptions);
    };


    /**
      Loads the Html for the edit payment instrument blend into a div child of the provided element.
      @public
      @method loadEditPaymentInstrumentHtml
      @for WebBlender
      @param {auth} authentication (required)
      @param {parentElementId} DOM element (e.g. div, span) into which Blends will be loaded (required)
      @param {environment} see resolveEnvironment for options (required)
      @param {flight} see wiki for options (optional)
      @param {clientType} see clientTypes (required)
      @param {culture} UI culture (required)
      @param {market} service market (required)
      @param {cv} correlation-vector (required)
      @param {paymentInstrumentId} payment instrument id (required)
      @param {iframeOptions} object specifying whether to use iframe, and if so, desired width and height of iframe (optional)
    */
    var loadEditPaymentInstrumentHtml = function(auth, parentElementId, environment, flight, clientType, culture, market, cv, paymentInstrumentId, iframeOptions) {
        var postBody = {
            "Auth": auth,
            "Culture": culture,
            "Market": market,
            "CV": cv,
            "PaymentInstrumentId": paymentInstrumentId
        };
        openBlend(postBody, parentElementId, environment, flight, clientType, "#/paymentAndBilling/editPaymentInstrument", iframeOptions);
    };


    /**
     Loads the Html for the Redeem Token blend into a div child of the provided element.
     @public
     @method loadRedeemHtml
     @for WebBlender
     @param {tokenString} Token string. If non-empty, blend will skip token input page, and go directly to confirm page. (optional)
     @param {auth} authentication (required)
     @param {parentElementId} DOM element (e.g. div, span) into which Blends will be loaded (required)
     @param {environment} see resolveEnvironment for options (required)
     @param {flight} see wiki for options (optional)
     @param {clientType} see clientTypes (required)
     @param {culture} UI culture (required)
     @param {market} service market (required)
     @param {cv} correlation-vector (required)
     @param {iframeOptions} object specifying desired width and height overrides of iframe (optional)
   */
    var loadRedeemHtml = function (tokenString, auth, parentElementId, environment, flight, clientType, culture, market, cv, iframeOptions) {
        var postBody = {
            "tokenString": tokenString,
            "Auth": auth,
            "Culture": culture,
            "Market": market,
            "CV": cv,
            "PurchaseServiceVersion": "6"
        }

        // Temporarily ignore flight param. Passing a flight here doesn't work in prod, and somehow nullifies PurchaseServiceVersion:6.
        // Will re-add once AMC stops passing in purchasev6:1 flight.
        openBlend(postBody, parentElementId, environment, null, clientType, "#/redeem/enterCode", iframeOptions);
    };

    /**
      Subscribes to the blend post messages.
      @public
      @method registerMessageHandler
      @for WebBlender
      @param {newHandler} subscriber to add
    */
    var registerMessageHandler = function (newHandler) {
        for (var i = 0; i < messageHandlers.length; i++) {
            if ('' + messageHandlers[i] === '' + newHandler) {
                return;
            }
        }
        messageHandlers.push(newHandler);
    };

    /**
      Unsubscribes from the blend post messages.
      @public
      @method unregisterMessageHandler
      @for WebBlender
      @param {handler} subscriber to remove
    */
    var unregisterMessageHandler = function (handler) {
        for (var i = 0; i < messageHandlers.length; i++) {
            if ('' + messageHandlers[i] === '' + handler) {
                messageHandlers.pop(handler);
            }
        }
    };

    /**
      Mapping of client types.
      @public
      @object clientTypes
      @for WebBlender
    */
    var clientTypes = {
        UniversalWebStore: "UniversalWebStore",
        MusicVideoReading: "MusicVideoReading",
        EnterpriseStore: "EnterpriseStore",
        AccountMicrosoftCom: "AccountMicrosoftCom"
    };

    return {
        loadSingleItemPurchaseHtml: loadSingleItemPurchaseHtml,
        loadOrderPurchaseHtml: loadOrderPurchaseHtml,
        loadRedeemHtml: loadRedeemHtml,
        loadAddPaymentInstrumentHtml: loadAddPaymentInstrumentHtml,
        loadEditPaymentInstrumentHtml: loadEditPaymentInstrumentHtml,
        registerMessageHandler: registerMessageHandler,
        unregisterMessageHandler: unregisterMessageHandler,
        clientTypes: clientTypes,
        resetHtmlFetched: resetHtmlFetched,
    };
}(jQuery);

}
/*
     FILE ARCHIVED ON 12:58:20 Jul 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:32:15 May 03, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 74.7
  exclusion.robots: 0.249
  exclusion.robots.policy: 0.234
  RedisCDXSource: 2.374
  esindex: 0.021
  LoadShardBlock: 44.957 (3)
  PetaboxLoader3.datanode: 81.566 (5)
  load_resource: 169.951 (2)
  PetaboxLoader3.resolve: 97.146 (2)
*/
