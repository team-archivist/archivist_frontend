/**
 *  - 공통 utils 객체입니다
 */
export default class CommonUtils {

    /**
     * - 해당 객체의 정확한 타입을 반환합니다
     * --> typeof 연산자( 부정확한 타입을 반환하는 오류 ) 대신 사용합니다
     * @return {string}
     */
    public static typeOf = ( o : unknown ) : string => {
        return ( Object.prototype.toString.call( o ).match(/\s([a-zA-Z]+)/) as string[] )[ 1 ].toLowerCase();
    }

    /**
     * - string 타입인지 확인합니다
     *
     * @param {*} v - variable to check
     *
     * @returns {boolean}
     */
    public static isString = ( v : unknown ) : v is string => {
        return 'string' === CommonUtils.typeOf( v );
    }

    public static isNotString = ( v : unknown ) => {
        return !CommonUtils.isString( v );
    }

    /**
     * - boolean 타입인지 확인합니다
     *
     * @param {*} v - variable to check
     *
     * @returns {boolean}
     */
    public static isBoolean = ( v : unknown ) : v is boolean => {
        return 'boolean' === CommonUtils.typeOf( v );
    }

    /**
     *
     * - number 타입인지 확인합니다
     *
     * @param {*} v - variable to check
     *
     * @returns {boolean}
     */
    public static isNumber = ( v : unknown ) : v is number => {
        return 'number' === CommonUtils.typeOf( v );
    }

    /**
     * - undefined 타입인지 확인합니다
     *
     * @param {*} v - variable to check
     *
     * @returns {boolean}
     */
    public static isUndefined = ( v : unknown ) : v is undefined => {
        return 'undefined' === CommonUtils.typeOf( v );
    }

    /**
     * - undefined 타입인지 확인합니다( Not )
     *
     * @param {*} v - variable to check
     *
     * @returns {boolean}
     */
    public static isNotUndefined = ( v : unknown ) : boolean => {
        return !CommonUtils.isUndefined( v );
    }

    /**
     * - 해당 function 이 Class 인지 확인합니다
     *
     * @param {Function} fn - function to check
     *
     * @returns { boolean }
     */
    public static isClass = <Class>( fn : unknown ) : fn is Class => {
        return CommonUtils.isFunction( fn ) && /^\s*class\s+/.test( fn.toString() );
    }

    /**
     * - 해당 function 이 Class 인지 확인합니다( not )
     *
     * @param {Function} fn - function to check
     *
     * @returns { boolean }
     */
    public static isNotClass = ( fn : unknown ) => {
        return !CommonUtils.isClass( fn );
    }

    /**
     * 해당 node 가 DocumentFragment 인지 체크합니다
     *
     * @param {Object} node
     * @returns {boolean}
     */
    public static isFragment( node : Node | Element ) : 0 | boolean {
        return node && 'object' === typeof node && node.nodeType && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
    }

    /**
     *  - 해당 파라미터가 비어있는지 확인합니다
     *
     *  @param { * } v - any to check
     *
     *  @returns { boolean }
     *
     */
    public static isEmpty = ( v : unknown ) : boolean => {

        if ( CommonUtils.isNumber( v ) ){
            return false;
        }

        return (
            null === v             ||
            CommonUtils.isUndefined( v ) ||
            0    === v.length      ||
            ""   === v             ||
            CommonUtils.isEmptyObject( v ) );
    }

    /**
     *  - 해당 파라미터가 비어있는지 확인합니다
     *
     *  @param { * } v - any to check
     *
     *  @returns { boolean }
     *
     */
    public static isNotEmpty = ( v : unknown ) : boolean => {
        return !CommonUtils.isEmpty( v );
    }

    /**
     * - 해당 객체가 빈 객체인지 확인합니다
     *
     * @param {object} o - object to check
     *
     * @returns {boolean}
     */
    public static isEmptyObject = ( o : unknown ) : o is object => {

        if ( !( o ) ) {
            return true;
        }

        return ( 0 === Object.keys( o ).length && o.constructor === Object );
    }

    /**
     * - promise 객체인지 확인합니다
     *
     * @param  {*}  o - object to check
     * @returns {boolean}
     */
    public static isPromise = <T>( o : unknown ) : o is Promise<T> => {
        return Promise.resolve( o ) === o;
    }

    /**
     * - 오브젝트인지 확인합니다
     *
     * @param { * } o - object to check
     *
     * @returns { boolean }
     */
    public static isObject = <T>( o : unknown ) : o is T => {
        return ( 'object' === CommonUtils.typeOf( o ) && null !== o && o.constructor );
    }

    /**
     * - 오브젝트인지 확인합니다
     *
     * @param { * } o - object to check
     *
     * @returns { boolean }
     */
    public static isNotObject = ( o : unknown ) => {
        return !CommonUtils.isObject( o );
    }

    /**
     * - 함수인지 확인합니다
     *
     * @param { * } fn - function to check
     * @returns { boolean }
     */
    public static isFunction = <Fnc>( fn : unknown ) : fn is Fnc => {
        return ( 'function' === CommonUtils.typeOf( fn ) || 'asyncfunction' === CommonUtils.typeOf( fn ) );
    }

    public static isNotFunction = ( fn : unknown ) => {
        return !CommonUtils.isFunction( fn );
    }

    public static isAsyncFunction = <Fnc>( fn : unknown ) : fn is Fnc => {
        return 'asyncfunction' === CommonUtils.typeOf( fn );
    }

    /**
     * - 해당 객체가 array 인지 여부를 반환합니다
     *
     * @returns { boolean }
     */
    public static isNotArray = <Arr>( arr : unknown ) : arr is Arr => {
        return !Array.isArray( arr );
    }

    /**
     * 사용자의 OS 를 표시하는 객체를 반환합니다
     *
     * @return { { [ key : string ] : boolean } }
     */
    public static getUserOS = () : { [ key : string ] : boolean } => {

        const OS = {
            win   : false,
            mac   : false,
            x11   : false,
            linux : false,
        };

        const userOS = Object.keys( OS ).find( os => -1 !== navigator.appVersion.toLowerCase().indexOf( os ) );

        if ( userOS ){
            OS[ userOS ] = true;
        }

        return OS;
    }

    /**
     * - 문자열의 첫 글자를 대문자로 바꿉니다
     *
     * @param { string } text
     *
     * @return { string }
     */
    public static capitalize = ( text : string ) : string => {
        return text[ 0 ].toUpperCase() + text.slice( 1 );
    }

    /**
     * 재귀적으로 객체들을 병합( merge )합니다
     *
     * @param { {} } target - merge target
     * @param { {} } sources - merge sources
     *
     * @return { {} }
     */
    public static deepMerge = function _deepMerge<T>( target : T , ...sources ) : T {

        if ( !( sources.length ) ){
            return target;
        }

        const source = sources.shift();

        if ( CommonUtils.isObject( target ) && CommonUtils.isObject( source ) ){

            for ( const key in source ){

                if ( CommonUtils.isObject( source[ key ] ) ){

                    if ( !( target[ key ] ) ){
                        Object.assign( target , { [ key ] : {} } );
                    }

                    _deepMerge( target[ key ] , source[ key ] );
                }
                else {
                    Object.assign( target , {  [ key ]: source[ key ] } )
                }
            }

        }

        return _deepMerge( target , ...sources );
    }

    /**
     * - 유효한 URL 을 반환합니다.
     * --> URL 을 만들었을 경우 그 URL 이 유효하면 자동으로 반환합니다
     * --> 만약, 유효하지 않을 경우,
     *     해당 url 이 '//'를 포함하고 있으면 window.location.protocol 과 연결하여 반환하고,
     *     포함하지 않으면 window.location.origin 과 연결하여 반환합니다
     *
     *  @param { string } url - url to prettify
     *
     *  @return { string }
     */
    public static getValidUrl = ( url : string ) : string => {
        try {

            const urlObject = new URL( url );

            return urlObject.href;
        }
        catch( e ){
            // do nothing but handle below
        }

        if ( '//' === url.substring( 0 , 2 ) ){
            return window.location.protocol + url;
        }
        return window.location.origin + url;
    }

    /**
     * - 새로운 tab 을 URL 로 만들어줍니다
     * @param { string } url  - redirect 할 URL 주소
     */
    public static openTab = ( url : string ) : void => {
        window.open( url , '_blank' );
    }

    /**
     *  - 랜덤한 고유 ID 를 반환합니다
     *
     *  @param { string } prefix - 식별자 prefix
     *  @returns { string }
     */
    public static generateId = ( prefix = '' ) : string => {
        return `${ prefix }${ ( Math.floor( Math.random() * 1e8 ) ).toString( 16 ) }`;
    }

    /**
     * - 문자열의 모든 공백을 제거합니다
     *
     * @param { string } str - 공백을 제거할 문자열입니다
     *
     * @return { string } 모든 공백을 제거한 문자열입니다
     */
    public static removeSpaceAll = ( str : string ) : string => {
        return str.replace(/(\s*)/g, "");
    }

    /**
     * - Promise 시퀀스를 비동기적으로 실행합니다
     *
     * --> 비동기 실행이나, 동기실행을, chains 에 넣은 순서대로 실행시켜줍니다
     *     ( 동기, 비동기 처리를 일관되게 처리합니다 )
     *
     * @param { object } chains - 처리할 동기, 비동기 객체리스트
     * @param { () => void } success? - 모든 처리가 끝날시 반환하는 콜백
     * @param { () => void } fallback? - 에러발생시 발생하는 콜백
     *
     * @returns { Promise }
     */
    public static async sequence( chains : { function : ( data : unknown ) => void , data : unknown }[] , success = () => {}, fallback = () => {} ) {

        /**
         * Decorator
         *
         * @param { {
         *            function : ( ...args : any[] ) => any ,
         *            data? : {}
         *          }[] |
         *          {
         *            function : ( ...args : any[] ) => any ,
         *            data? : {} ,
         *          }
         *       } chainData - Chain data
         *
         * @param { ( data : object ) => void } successCallback - success callback
         * @param { ( data : object ) => void } fallbackCallback - fail callback
         *
         * @returns { Promise }
         */
        async function waitNextBlock( chainData : { function : ( data : unknown ) => void , data : unknown } , successCallback, fallbackCallback ) {
            try {

                await chainData.function( chainData.data );

                await successCallback( !( CommonUtils.isUndefined( chainData.data ) ) ? chainData.data : {} );

            }
            catch (e) {

                fallbackCallback( !( CommonUtils.isUndefined( chainData.data ) ) ? chainData.data : {} );

            }
        }

        /**
         *
         * - chains 의 각 엘리먼트를 queue 에서 꺼냅니다
         *
         * - 먼저, previousValue 의 값은 Promise<resolve> 입니다
         *
         * - currentValue 의 값은
         *
         * - 그리고 , 각각 plugins 의 "prepare" 메서드는 Promise 객체를 반환합니다.
         *
         *   currentValue( Promise ) 가 resolve 를 반환하기 전에는 reduce 를 계속 실행하지 않습니다
         *
         * @param { Promise<resolve> } previousValue
         * @param { { data? : {} , function : ( ...args : any[] ) => any } } currentValue
         */
        return chains.reduce( async ( previousValue, currentValue ) => {

            await previousValue;

            return waitNextBlock( currentValue , success , fallback );

        }, Promise.resolve() );
    }

    /**
     *  - array-like collection 을 array 로 맨듭니다
     *
     * @param { ArrayLike<any> | NodeList | HTMLCollection } collection - array 로 변경할 collection
     * @return { any[] }
     */
    public static array = <T>( collection : ArrayLike<T> | NodeList | HTMLCollection ) : T[] => {
        return Array.prototype.slice.call( collection );
    }

    /**
     * - 해당 array 의 built-in 메서드들을 래핑해 내보냅니다
     * --> 해단 built-in 메서드들을 호출할때, 해당 callback 이 호출되도록 합니다
     *
     * @param { Array } array
     * @param { function } callback
     *
     * @return { Array } array
     */
    public static wrappingArray = <T>( array : T[] = [] , callback? ) => {

        /** 래핑할 built-in array 메서드 목록입니다 */
        const wrappingMethodNames = [ 'push' , 'pop' , 'shift' , 'unshift' , 'splice' , 'sort' , 'reverse' ];

        const _proto = {};

        /** 해당 메서드를 wrapping 합니다 */
        wrappingMethodNames.forEach( wrappingMethodName => {

            /** built-in 메서드를 저장해둡니다 */
            const builtInMethod = array[ wrappingMethodName ];

            /** 해당 메서드를 wrapping 후 할당합니다 */
            _proto[ wrappingMethodName ] = function( ...args ){

                if ( CommonUtils.isFunction( callback ) ){
                    callback.call( array , ...args );
                }

                builtInMethod.call( array , ...args );
            }

            _proto[ wrappingMethodName ].bind( array );

        } );

        /** 해당 array 객체를 wrapping 합니다 */
        Object.setPrototypeOf( _proto , Array.prototype );

        Object.setPrototypeOf( array , _proto );

        return array
    }

    /**
     * - 받은 메서드를 해당 timer 만큼 지연 후 실행시키는 함수를 반환합니다
     *
     * @param { ( ...args : any[] ) => any } method - 실행할 메서드
     * @param { number } timer - timer in ms
     *
     * @return { function }
     */
    public static delay = ( method : ( ...args : any[] ) => any, timer : number ) => {

        /**
         *  @return { void }
         */
        return function(){

            const context = this;

            const args = arguments;
            // @ts-ignore
            window.setTimeout( ()=> method.apply( context , args ) , timer );

        }
    }

    /**
     * - 해당 파일의 확장자를 가져옵니다
     *
     * @param { File } file - file
     *
     * @return { string }
     */
    public static getFileExtension( file : File ) {
        return file.name.split( '.' ).pop();
    }

    /**
     * 해당 string 이 MIME 타입인지 체크 결과를 반환합니다
     *
     * @param { string } type - string to check
     *
     * @returns { boolean }
     */
    public static isValidMimeType = ( type : string ) : boolean => {
        return ( /^[-\w]+\/([-+\w]+|\*)$/.test( type ) );
    }

    /**
     * Debouncing method
     * Call method after passed time
     *
     * - 해당 함수( func )를 지연시간( wait ) 후에 호출합니다
     *
     * - 이 메서드는 함수를 반환하고, 반환한 함수를 호출해야 합니다
     *
     * @param { ( ...args : unknown[] ) => void } func - 호출할 함수
     * @param { number } wait? - time in milliseconds
     * @param { boolean } immediate? - call now( 즉시 호출할 것인지 여부 )
     *
     * @return { () => void }
     */
    public static debounce( func : ( ...args : unknown[] ) => void , wait : number , immediate = false ) : () => void {

        let timeout;
        /**
         * @param { unknown[] } args
         * @return { void }
         */
        return ( ...args ) => {

            const context = this;

            const later = () => {
                timeout = null;

                if ( !( immediate ) ){
                    func.apply( context , args )
                }
            }

            const callNow = immediate && !( timeout );

            window.clearTimeout( timeout );

            timeout = window.setTimeout( later , wait );

            if ( callNow ){
                func.apply( context , args );
            }

        }

    }

    /**
     * - 들어온 값이 number 로 변환가능할 경우에만 해당 string 을 반환합니다
     *
     * --> 그 외에는 빈 값을 반환합니다
     *
     * @param { string } v
     *
     * @return { string }
     */
    public static enableNumber = ( v : string ) : string => {
        return v.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    /**
     * - 함수를 반환합니다. 이 함수는 호출될 때 지정된 시간 동안 최대 한 번만 트리거됩니다.
     *
     * @param { function } func - 스로틀에 대한 기능
     * @param { number } wait - 해당 기간 동안 함수가 한 번만 호출됩니다.
     * @param { { leading? :boolean , trailing? : boolean } | undefined }  options - 일반적으로 throttled function 은 'wait' 시간 당
     *                       한 번 이상 실행하지 않고 가능한 한 많이 실행됩니다,
     *                       leading edge 에서 실행을 비활성화하려면  '{leading:false}'를 전달하십시오.
     *                        trailing edge 에서 실행을 비활성화합니다
     *
     * @return { function }
     */
    public static throttle( func , wait , options = undefined ){
        let context, args, result;
        let timeout = null;
        let previous = 0;

        if (!options) {
            options = {};
        }

        /**
         * @return { void }
         */
        const later = function() {
            previous = false === options.leading ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);

            if (!timeout) {
                context = args = null;
            }
        };

        /**
         * @return { unknown }
         */
        return function() {
            const now = Date.now();

            if (!previous && false === options.leading) {
                previous = now;
            }

            const remaining = wait - ( now - previous );

            context = this;

            // eslint-disable-next-line prefer-rest-params
            args = arguments;

            if ( 0 >= remaining || remaining > wait ) {
                if (timeout) {
                    clearTimeout( timeout );
                    timeout = null;
                }
                previous = now;
                result = func.apply( context , args );

                if (!timeout) {
                    context = args = null;
                }
            }
            else if ( !( timeout ) && false !== options.trailing ) {
                timeout = setTimeout( later , remaining );
            }

            return result;
        };
    }

    /**
     * 해당 메소드 호출을 감지할 수 있는 형태로 확장합니다.
     * 메소드 실행 후 지정된 이름의 콜백함수를 실행합니다.
     *
     * @see set, get으로 설정되었다면 set, get 내부 변수를 그대로 사용하면 안됩니다 : 안그러면 set 안에서 set을 호출합니다.
     * @deprecated Around로 기능 변경 , 버전 업데이트 시 삭제할 예정
     * @static
     * @param {string} afterExecuteFunctionName - 필드 값이 변경되고 난 후 처리할 함수의 이름
     * */
    public static watch = ( { afterExecuteFunctionName } ) => {

        return ( target , propertyKey , descriptor ) => {

            const targetOverride = descriptor.value ? "value" : "get";

            const originalMethod = descriptor[ targetOverride ];

            const isCanOverrideAccessor = "get" === targetOverride && descriptor.set

            /**
             * 기존 Setter Override : this 바인딩을 위해 화살표 함수 안씀
             *
             * */
            descriptor[ targetOverride ] = function ( ...args ) {

                originalMethod.call( this , ...args );

                this[afterExecuteFunctionName]( { isNeedToShare : true, data : { ...args } }  );
            }

            /**
             * Accessor Overide : 기존 Setter Override : this 바인딩을 위해 화살표 함수 안씀
             *
             * @see set, get으로 설정되었다면 set, get 내부 변수를 그대로 사용하면 안됩니다 : 안그러면 set 안에서 set을 호출합니다.
             * */
            if ( isCanOverrideAccessor ) {
                const originSetter = descriptor.set;

                descriptor.set = function ( value ) {

                    originSetter.call( this, value );

                    this[afterExecuteFunctionName]( { isNeedToShare : true, data : value } );
                }
            }

            return descriptor;
        }
    }

    /**
     *  - 현재 접속한 기기가 IOS 이면 true 를 반환합니다
     */
    public static get isIosDevice() {
        return (
            'undefined' !== typeof window &&
            window.navigator              &&
            window.navigator.platform     &&
            ( /iP(ad|hone|od)/.test (window.navigator.platform ) ||
                ('MacIntel' === window.navigator.platform && 1 < window.navigator.maxTouchPoints ) )
        );
    }

    /**
     * - 현재 접속한 브라우저가 edge 일 경우 true 를 반환합니다
     */
    public static get isEdge() : boolean {

        const userAgent = window.navigator.userAgent;

        return ( /Edge\/\d./i.test( userAgent ) || /Edg/i.test( userAgent ) );
    }

    /**
     *
     * - http( s ) 프로토콜이 존재하거나 , 뒤쪽에 도메인 주소가 포함되어 있으면 domain 주소로 인식합니다
     *
     * @param str - domain 인지 검사할 string
     * @return { boolean } - domain 인지 여부
     */
    public static isDomainString( str : string ) : boolean {
        return ( /(\w+.(?:\.com|\.co\.kr|\.kr|\.org|\.net))/g.test( str ) || /^(\w+):(\/\/)?/.test( str ) );
    }

    /**
     *
     * 'vc.ru', 'google.com' 같은 'http' protocol 을 포함하고 있는지 여부를 반환합니다
     *
     *
     * @param { string } link - string to process
     *
     * @return { boolean }
     */
    public static includesProtocol = ( link : string ) : boolean => {
        return ( /^(\w+):(\/\/)?/.test( link ) );
    }

    /**
     *
     * 'vc.ru', 'google.com' 같은 'http' protocol 을 추가합니다
     *
     *
     * @param { string } link - string to process
     *
     * @return { string }
     */
    public static addProtocol = ( link : string ) : string => {

        /**  protocol 이 이미 존재하면 진행하지 않습니다 */
        if ( CommonUtils.includesProtocol( link ) ){
            return link;
        }

        /**
         * - 누락된 HTTP 프로토콜은 link 에 추가해야 하지만, 2가지 경우에는 skip 합니다
         *
         *   1) "/general" 같은 내부링크
         *
         *   2) anchor 가 "#results" 일 경우,
         *
         *   3) "//google.com" 과 같은 protocol 관련 URL
         */
        const isInternal =  /^\/[^/\s]/.test( link );

        const isAnchor   = ( '#' === link.substring( 0 , 1 ) );

        const isProtocolRelative = /^\/\/[^/\s]/.test( link );

        if ( !( isInternal ) && !( isAnchor ) && !( isProtocolRelative ) ){
            link = 'http://' + link;
        }

        return link;
    }

    /**
     *  - unknown type 인 va1 과 va2 가 같은지 비교합니다
     *
     * @param { unknown } var1 - 비교할 값1
     * @param { unknown } var2 - 비교할 값2
     * @return { boolean } - 같은값인지 비교
     */
    public static equals = ( var1 : unknown , var2 : unknown ) : boolean => {

        const isVar1NonPrimitive = Array.isArray( var1 ) || CommonUtils.isObject( var1 );

        const isVar2NonPrimitive = Array.isArray( var2 ) || CommonUtils.isObject( var2 );

        if ( isVar1NonPrimitive || isVar2NonPrimitive ) {
            return JSON.stringify( var1 ) === JSON.stringify( var2 );
        }

        return var1 === var2;
    }

    /**
     * - 해당 url 의 fromStr 을 toStr 로 변경합니다
     */
    public static replaceURLFor( url : string , fromStr : string , toStr : string ) : string {

        const urlList = url.split( '/' );

        const changeIndex = urlList.findIndex( src => fromStr === src );

        if ( -1 === changeIndex ){
            return url;
        }

        urlList[ changeIndex ] = toStr;

        return urlList.join( '/' );

    }
}