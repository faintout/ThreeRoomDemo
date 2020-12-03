// var door_content_left = true
// var door_content_right = true
// var door_content_front = true
// var door_right = true
var doorStatusObj = {
    door_content_left:true,
    door_content_right : true,
    door_content_front : true,
    door_right : true
}

THREE.ThreeJs_Composer = function (_renderer, _scene, _camera, _options, _selectobject) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var selectedObjects = [];
    //后期
    var composer = new THREE.EffectComposer(_renderer);

    // composer.addPass( effectFXAA );
    // window.addEventListener("click", onMouseClick);
    window.addEventListener('dblclick', onMouseClick);
    // window.addEventListener( 'keypress', function (e) {
    //     console.log(e);
    //     if(e.key=='q'){
    //         // camera.translateX( -50 );
    //         // controls.pan( new THREE.Vector3( -10, 0, 0 ) );
    //     }
    //     update()
    //   });
    $('#reset').click(function () {
        moveCamera({ x: 0, y: 2500, z: 2500 }, { x: 0, y: 0, z: 0 })
        doorObjects.forEach(door => {
            door.rotation.y = 0
            if (door.name == '中间前门') {
                door.rotation.y = -1.6
            }
            for(let i in doorStatusObj){
                doorStatusObj[i] = true
            }
            console.log(door.rotation.y);

        })
    }
        //关闭所有门
        // console.log('objects',objects);

    )
    // $('#reset').click(function () { console.log(camera, controls,doorObjects)})
    // $('#reset').click(function () { console.log(camera, controls,doorObjects)})
    // console.log('objects',objects);
    //
    // function () {
    //     console.log(camera, controls);
    //重置视角
    // position.set(x: 1412, y: 1225, z: 1281)
    // 010
    // controls.set(x: 1427, y: 88, z: -254)
    // camera.position.x = 0
    // initCamera()
    // initControls()

    // new TWEEN.Tween({
    //     x1: camera.position.x, // 相机x
    //     y1: camera.position.y, // 相机y
    //     z1: camera.position.z, // 相机z
    //     x2: controls.x, // 控制点的中心点x
    //     y2: controls.y, // 控制点的中心点y
    //     z2: controls.z, // 控制点的中心点z
    //     x3: camera.up.x,
    //     y3: camera.up.y,
    //     z3: camera.up.z
    // }).to({
    //     x1: 0,
    //     y1: 2500,
    //     z1: 2500,
    //     x2: 0,
    //     y2: 0,
    //     z2: 0,
    //     x3: 0,
    //     y3: 1,
    //     z3: 0
    // // }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
    // //     controls.reset()
    // // }).start();
    // },600).onUpdate(function(object) {
    //     camera.position.x = object.x1;
    //     camera.position.y = object.y1;
    //     camera.position.z = object.z1;
    //     controls.center.x = object.x2;
    //     controls.center.y = object.y2;
    //     controls.center.z = object.z2;
    //     camera.up.x = object.x3;
    //     camera.up.y = object.y3;
    //     camera.up.z = object.z3;

    // }).easing(TWEEN.Easing.Elastic.Out).onComplete(function () { controls.reset() }).start()

    // initControls()
    // update()

    // }
    //移动视角
    function moveCamera(toCamera, toControls, toDoFunction) {
        console.log('点击');
        console.log(toCamera, toControls);
        new TWEEN.Tween({
            x1: camera.position.x, // 相机x
            y1: camera.position.y, // 相机y
            z1: camera.position.z, // 相机z
            x2: controls.x, // 控制点的中心点x
            y2: controls.y, // 控制点的中心点y
            z2: controls.z, // 控制点的中心点z
            x3: camera.up.x,
            y3: camera.up.y,
            z3: camera.up.z
        }).to({
            x1: toCamera.x,
            y1: toCamera.y,
            z1: toCamera.z,
            x2: toControls.x,
            y2: toControls.y,
            z2: toControls.z,
            x3: 0,
            y3: 1,
            z3: 0
            // }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
            //     controls.reset()
            // }).start();
        }, 600).onUpdate(function (object) {
            camera.position.x = object.x1;
            camera.position.y = object.y1;
            camera.position.z = object.z1;
            controls.center.x = object.x2;
            controls.center.y = object.y2;
            controls.center.z = object.z2;
            camera.up.x = object.x3;
            camera.up.y = object.y3;
            camera.up.z = object.z3;

        }).easing(TWEEN.Easing.Cubic.InOut).onComplete(function () { toDoFunction || null }).start()
    }
    //双击点击事件
    function onMouseClick(event) {
        var x, y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, _camera);
        // if(isDoubleClickGroupSetMesh){
        //     selectDoubleClickIbject()
        //     isDoubleClickGroupSetMesh = false
        // }
        console.log('obj',objects);
        var intersects = raycaster.intersectObjects([_scene], true);
        console.log('双击', intersects);
        if (intersects.length == 0) {
            $("#label").attr("style", "display:none;"); //隐藏说明性标签
            return;
        }
        if (
            intersects[0].object.name == "地面" ||
            intersects[0].object.name == "" ||
            intersects[0].object.name == "墙面"
        ) {
            $("#label").attr("style", "display:none;"); //隐藏说明性标签
            selectedObjects.pop();
        } else {
            $("#label").attr("style", "display:block;"); // 显示说明性标签
            $("#label").css({ left: x, top: y - 40 }); // 修改标签的位置
            $("#label").text(intersects[0].object.name); // 显示模型信息

            selectedObjects.pop();
            selectedObjects.push(intersects[0].object);
        }
        //移动事件
        if (intersects[0].object.name.split("#")[0] == "移动块") {
            console.log('选中', intersects[0].object);
            // _selectobject = []

            _selectobject.unshift(intersects[0].object)
            console.log('_selectobject', _selectobject);
            // scene.remove(floor);
            // scene.add(gridHelper);
            scene.add(rollOverMesh);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('mousedown', onDocumentMouseDown, false);

            // var href = "DispatchAction.do?efFormEname=YMIQ083DP&inqu_status-0-storageUnitId=" + Msg[1];
            // EFColorbox({
            //     href : href,
            //     title:"货物详情",
            //     innerWidth:'1200px',
            //     innerHeight:'800px',
            //     iframe : true,
            //     scrolling : false,
            //     overlayClose: false
            // });
        }
        //开门动作
        console.log(intersects[0].object.name);
        switch (intersects[0].object.name) {
            case "中间左门":
                if (doorStatusObj.door_content_left) {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: -.5 * Math.PI
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_content_left = false;
                    //变换相机角度
                    // moveCamera({x: -608, y: 1411, z: 329},{x: 525, y: 103, z: -215})

                    moveCamera({ x: -400, y: 1168, z: 228 }, { x: 525, y: 103, z: -215 })
                } else {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: 0
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_content_left = true;
                }

                console.log(intersects[0].object.rotation);
                break;
            case "中间前门":
                if (doorStatusObj.door_content_front) {
                    // intersects[0].object.position.x+=50
                    // intersects[0].object.position.z-=50
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: 0,
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    moveCamera({ x: -400, y: 1168, z: 228 }, { x: 525, y: 103, z: -215 })
                    door_content_front = false;
                } else {
                    // intersects[0].object.position.x-=50
                    // intersects[0].object.position.z+=50
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: -1.5
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_content_front = true;
                }
                console.log(intersects[0].object.rotation);
                break;
            case "中间右门":
                if (doorStatusObj.door_content_right) {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: -.5 * Math.PI
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_content_right = false;
                    // moveCamera({x: 1412, y: 1225, z: 1281},{x: 1427, y: 88, z: -254})

                    moveCamera({ x: 1416, y: 804, z: 713 }, { x: 1427, y: 88, z: -254 })
                } else {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: 0
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_content_right = true;
                }
                console.log(intersects[0].object.rotation);
                break;
            case "右墙门":
                if (doorStatusObj.door_right) {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: -.5 * Math.PI
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_right = false;
                } else {
                    new TWEEN.Tween(intersects[0].object.rotation).to({
                        y: 0
                    }, 1000).easing(TWEEN.Easing.Elastic.Out).onComplete(function () {
                    }).start();
                    door_right = true;
                }
                console.log(intersects[0].object.rotation);
                break;
        }
    }
    function onMouseDblClick(event) {
        console.log(event);
        var x, y;
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = - (y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, _camera);
        var intersects = raycaster.intersectObjects([_scene], true);
        console.log(intersects);
        if (intersects.length == 0) {
            return;
        }

        // var Msg = intersects[0].object.name
        if (intersects[0].object.name == "移动块") {

            // scene.remove(floor);
            // scene.add(gridHelper);
            scene.add(rollOverMesh);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('mousedown', onDocumentMouseDown, false);

            // var href = "DispatchAction.do?efFormEname=YMIQ083DP&inqu_status-0-storageUnitId=" + Msg[1];
            // EFColorbox({
            //     href : href,
            //     title:"货物详情",
            //     innerWidth:'1200px',
            //     innerHeight:'800px',
            //     iframe : true,
            //     scrolling : false,
            //     overlayClose: false
            // });
        }
    }
    console.log('返回数据', composer);
    return composer;
};
