/* @flow */
import Xiao from './main'
import { warn, log } from './util/debug'

import {HTMLParser, HTMLtoXML, HTMLtoDOM} from './compiler/htmlparser'

// D:\OutPut\VUE\vue\src\core\instance\lifecycle.js
export function mountComponent(
    vm: Xiao,
    el: Element,
    hydrating?: boolean
) {
    let results : string = '';
    
    const htmlString: string = "<p id=test>hello <i>world";

    HTMLParser(htmlString, {
        start: function (tag, attrs, unary) {
            results += "<" + tag;

            for (var i = 0; i < attrs.length; i++)
                results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

            results += (unary ? "/" : "") + ">";
        },
        end: function (tag) {
            results += "</" + tag + ">";
        },
        chars: function (text) {
            results += text;
        },
        comment: function (text) {
            results += "<!--" + text + "-->";
        }
    });

    log('htmlparser HTMLtoXML', HTMLtoXML(htmlString));
    log('htmlparser HTMLtoDOM', HTMLtoDOM(htmlString));
    log('htmlparser HTMLParser', results == '<p id="test">hello <i>world</i></p>');

}