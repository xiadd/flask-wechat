(function (doc) {

    function deepClone(obj){
        var result = {};
        for(var i in obj){
            result[i] = obj[i];
        }

        return result;
    }

    var weui = {};
    weui.toast = function (_config) {
        config = deepClone(_config);

        var html =
            '<div class="weui_mask_transparent"></div>' +
            '<div class="weui_toast">' +
            '   <i class="weui_icon_toast"></i> ' +
            '   <p class="weui_toast_content">' +
                    config.text +
            '   </p>' +
            '</div>';

        var _toast = doc.createElement('div');
        _toast.innerHTML = html;
        _toast.setAttribute('id', 'toast');
        if (!doc.querySelector('#toast')) {
            doc.body.appendChild(_toast);
        }

        timer = setTimeout(function () {
            var el = doc.querySelector('#toast');
            doc.body.removeChild(el)
        }, config.hideTime*1000)


    };

    /**
     *
     * @param _config(text)
     */

    weui.loadingToast = function (_config) {
        config = deepClone(_config);

        var html =
            '<div class="weui_mask_transparent"></div>' +
            '   <div class="weui_toast">' +
            '       <div class="weui_loading">' +
            '           <div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
            '           <div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
            '       </div>' +
            '       <p class="weui_toast_content">' + config.text + '</p>' +
            '</div>';

        var _loadingToast = doc.createElement('div');
        _loadingToast.innerHTML = html;
        _loadingToast.setAttribute('id', 'loadingToast');
        _loadingToast.className='weui_loading_toast'
        if(!doc.querySelector('#loadingToast')){
            doc.body.appendChild(_loadingToast);
        }
    };

    /**
     *
     * @param _config
     */
    weui.alert = function (_config) {
        config = deepClone(_config);

        var html =
            '<div class="weui_mask"></div>' +
            '<div class="weui_dialog"> ' +
            '   <div class="weui_dialog_hd">' +
            '       <strong class="weui_dialog_title">' +
                        config.title +
            '       </strong>' +
            '   </div> ' +
            '   <div class="weui_dialog_bd">' +
                    config.desc +
            '   </div>' +
            '   <div class="weui_dialog_ft">' +
            '       <a href="#" class="weui_btn_dialog primary">确定</a>' +
            '   </div>' +
            '</div>';

        var _alert = doc.createElement('div');
        _alert.className = 'weui_dialog_alert';
        if (!doc.querySelector('.weui_dialog_alert')) {
            _alert.innerHTML = html;
            doc.body.appendChild(_alert);
        }

        var confirm_btn=doc.querySelector('.weui_btn_dialog')
        confirm_btn.addEventListener('click',function(){
            var el=doc.querySelector('.weui_dialog_alert')
            doc.body.removeChild(el)
        },false)

    };

    weui.dialog = function (_config) {
        config=deepClone(_config)//title,desc,confirm,cancel
        var html =
            '<div class="weui_mask"></div>' +
            '<div class="weui_dialog">' +
            '   <div class="weui_dialog_hd">' +
            '       <strong class="weui_dialog_title">'+
                        config.title +
            '       </strong>' +
            '   </div>' +
            '   <div class="weui_dialog_bd">' +
                        config.desc +
            '   </div>' +
            '   <div class="weui_dialog_ft">' +
            '       <a href="#" class="weui_btn_dialog default btn_cancel">取消</a>' +
            '       <a href="#" class="weui_btn_dialog primary btn_confirm">确定</a>' +
            '   </div>' +
            '</div>'

        var _dialog = doc.createElement('div');
        _dialog.className = 'weui_dialog_confirm';
        if(!doc.querySelector('.weui_dialog_confirm')){
            _dialog.innerHTML = html;
            doc.body.appendChild(_dialog);
        }

        var cancel_btn = doc.querySelector('.btn_cancel'),
            confirm_btn = doc.querySelector('.btn_confirm');

        cancel_btn.addEventListener('click', function () {
            doc.body.removeChild(_dialog)
            config.cancel()

        });

        confirm_btn.addEventListener('click', function () {
            doc.body.removeChild(_dialog);
            config.confirm()
        })
    };

    weui.actionSheet = function (_config) {
        config = deepClone(_config);//menulist,cancel
        var template=''
        for(var i in config.menulist){
            template += '<div class="weui_actionsheet_cell">' + i + '</div>';

        }
        var html =
            '<div class="weui_mask_transition" id="mask"></div>' +
            '   <div class="weui_actionsheet" id="weui_actionsheet">' +
            '       <div class="weui_actionsheet_menu">' +
                        template +
            '       </div>' +
            '       <div class="weui_actionsheet_action">' +
            '           <div class="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>' +
            '       </div>' +
            '   </div>' +
            '</div>';

        var _actionSheet=doc.createElement('div')
        _actionSheet.setAttribute('id','actionSheet_wrap')
        _actionSheet.innerHTML = html;
        if(!doc.querySelector('#actionSheet_wrap')){
            doc.body.appendChild(_actionSheet);
            doc.querySelector('#mask').style.display = 'block';
            doc.querySelector('#mask').style.background = 'rgba(0,0,0,0.35)';
            doc.querySelector('.weui_actionsheet').classList.add('to-top')

        }
        doc.querySelector('#mask').addEventListener('click', function () {
            doc.body.removeChild(_actionSheet);
        });
        var lists = doc.querySelector('.weui_actionsheet_menu');
        lists.addEventListener('click', function (e) {
            var target = e.target;
            if (target.className === 'weui_actionsheet_cell') {
                config.menulist[target.innerText]()
                doc.body.removeChild(_actionSheet);
            }
        }, false);

        var cancel_btn = doc.querySelector('#actionsheet_cancel');
        cancel_btn.addEventListener('click',function(){
            doc.body.removeChild(_actionSheet);
            if (config.cancel){
                config.cancel();
            }
        })
    };
    window.weui = window.weui || weui;
})(document);
