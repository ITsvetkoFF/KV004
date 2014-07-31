var N = 1000,
            startPoint = new Point(1, 1),
            endPoint = new Point(N, N),
            counter = 0;

function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.draw = function (canvas) {
    var ctx = canvas || document.getElementById('cnv').getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.x, this.y, 1, 1);
    ctx.fill();
};

Point.prototype.toString = function () {
    return this.x + ' - ' + this.y;
};

function Matrix(n) {
    var i = 0,
        j = 0;

    this.arr = [];

    for (i = 0; i <= n; i = i + 1) {
        var elem = [];

        for (j = 0; j <= n; j = j + 1) {
            elem.push(0);
        }

        this.arr.push(elem);
    }

    this.path = [];

    for (i = 0; i <= n; i = i + 1) {
        var elem = [];

        for (var j = 0; j <= n; j = j + 1) {
            elem.push(0);
        }

        this.path.push(elem);
    }
};

Matrix.prototype.toString = function () {
    var s = '',
        i = 0,
        j = 0,
        len = this.arr.length;

    for (i = 0; i < len; i++) {
        s += this.arr[i] + '\n';
    }

    return s;
};

function isExist(x, y) {
    return (((x >= 0) && (x <= N)) && ((y >= 0) && (y <= N))) ? true : false;
};

function getPath(m) {
    var i = m.arr[N][N] - 1,
        len = m.arr[N][N] - 1,
        arr = [];

    arr.push(endPoint);

    for (i; i >= 1; i--) {
        arr.push(m.path[arr[len - i].x][arr[len - i].y]);
        m.path[arr[len - i].x][arr[len - i].y].draw();
    }

    return arr;
};

(function ($) {
    $(document).ready(function () {
        var cnv = document.getElementById('cnv'),
            value = $('#select').val();

        $('#getPath').click(function () {
            var sx = $('#startX').val(),
                sy = $('#startY').val(),
                ex = $('#endX').val(),
                ey = $('#endY').val();

            if (((sx != '') && (sy != '') && (ex != '') && (ey != '')) && ((sx >= 0 && sx <= 1000) && (sy >= 0 && sy <= 1000) && (ex >= 0 && ex <= 1000) && (ey >= 0 && ey <= 1000))) {
                startPoint.x = +sx;
                startPoint.y = +sy;
                endPoint.x = +ex;
                endPoint.y = +ey;
            }
            else {
                alert('The coordinates, You wrote, are not valid, or are not full! Please, write the coordinates from the segment [0 - 1000].');
                return;
            }

            cnv.getContext('2d').clearRect(0, 0, 1000, 1000)

            var m = new Matrix(N),
                step = 1,
                wasFound = (N + 1) * (N + 1),
                i = 0,
                j = 0,
                start = 0,
                end = 0,
                prev_step_input = 1,
                cur_step_input = 0,
                cur_step_found = 0,
                cx = 0,
                cy = 0;

            //для эксперимента
            var x = [],
                y = [],
                len = 0,
                len_ = 0;

            start = new Date();

            m.arr[startPoint.x][startPoint.y] = step;

            x.push(startPoint.x);
            y.push(startPoint.y);

            wasFound = wasFound - 1;

            while (wasFound > 0) {
                len = x.length;

                for (i = len_; i < len; i = i + 1) {
                    var p = new Point(x[i], y[i]);

                    //1 point: x + 1 / y + 2
                    cx = x[i] + 1;
                    cy = y[i] + 2;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //2 point: x + 2 / y + 1
                    cx = x[i] + 2;
                    cy = y[i] + 1;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //3 point: x + 2 / y - 1
                    cx = x[i] + 2;
                    cy = y[i] - 1;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //4 point: x + 1 / y - 2
                    cx = x[i] + 1;
                    cy = y[i] - 2;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //5 point: x - 1 / y - 2
                    cx = x[i] - 1;
                    cy = y[i] - 2;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //6 point: x - 2 / y - 1
                    cx = x[i] - 2;
                    cy = y[i] - 1;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //7 point: x - 2 / y + 1
                    cx = x[i] - 2;
                    cy = y[i] + 1;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }

                    //8 point: x - 1 / y + 2
                    cx = x[i] - 1;
                    cy = y[i] + 2;
                    if (isExist(cx, cy) && (m.arr[cx][cy] === 0)) {
                        m.arr[cx][cy] = step + 1;
                        m.path[cx][cy] = p;
                        wasFound = wasFound - 1;

                        if (cx === endPoint.x && cy === endPoint.y) {
                            wasFound = 0;
                        }

                        x.push(cx);
                        y.push(cy);
                    }
                };

                len_ = len;
                step = step + 1;
            }

            end = new Date();

            $('#for_time').text('It takes ' + (end - start) + 'ms to find path!');
            $('#for_steps').text('There are ' + (m.arr[endPoint.x][endPoint.y] - 1) + ' steps from start point to end point!');

            getPath(m);
        });

    });
})(jQuery)