define( 
    'geo-gl-input', 
    [], 
    function() {
        return {
            parent: null, // engine
            setParent: function(obj) {
                this.parent = obj;
            },            
            MouseX: null,
            MouseY: null,
            isMouseDown: false,
            subcribe: function (docinst, canvas) {
                canvas.onmousedown = this.onMouseDown.bind(this);
                docinst.onmouseup = this.onMouseUp.bind(this);
                docinst.onmousemove = this.onMouseMove.bind(this);
                canvas.onwheel = this.onWheel.bind(this);
            },
            onMouseDown: function (event) {
                this.MouseX = event.ClientX;
                this.MouseY = event.ClientY;   
                this.isMouseDown = true;
            },
            onMouseUp: function (event) {
                this.isMouseDown = false;
            },
            onMouseMove: function (event) {
                if (!this.parent || !this.isMouseDown) {
                    return;
                }
                var 
                    camera = this.parent.render.camera,
                    newX = event.clientX,
                    newY = event.clientY;                    
    
                    camera.yaw += (this.MouseX ? this.MouseX - newX : 0) / 10;
                    camera.pitch += (this.MouseY ? this.MouseY - newY : 0) / 10;

                    this.MouseX = newX;
                    this.MouseY = newY;
                },
                onWheel: function (event) {
                    if (!this.parent) {
                        return;
                    }
                    var 
                        camera = this.parent.render.camera; 

                    camera.distance += event.deltaY / 1000;
                }            
        };
    } 
);