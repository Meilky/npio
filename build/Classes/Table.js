"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTable = void 0;
var CTable = /** @class */ (function () {
    function CTable(name, options) {
        /*
         * ┌───────────┐
         * │ Main menu │
         * ├───┬───────┤
         * │ 1 │ get   │
         * │ 2 │ set   │
         * │ 0 │ exit  │
         * └───┴───────┘
         */
        this.tableChars = {
            middleMiddle: "─",
            rowMiddle: "┼",
            topRight: "┐",
            topLeft: "┌",
            leftMiddle: "├",
            topMiddle: "┬",
            bottomRight: "┘",
            bottomLeft: "└",
            bottomMiddle: "┴",
            rightMiddle: "┤",
            left: "| ",
            right: " |",
            middle: " │ ",
        };
        this.idColMaxWidth = 0;
        this.nameColMaxWidth = 0;
        this.width = 0;
        this.top = [];
        this.middle = [];
        this.bottom = [];
        this.name = name;
        this.options = options;
        this.calculate();
    }
    /*
     * Calculate everything for the table
     */
    CTable.prototype.calculate = function () {
        var _this = this;
        this.options.map(function (option, id) {
            var nameLength = option.name.length;
            var idLength = (id++).toString().length;
            if (_this.idColMaxWidth < idLength)
                _this.idColMaxWidth = idLength;
            if (_this.nameColMaxWidth < nameLength)
                _this.nameColMaxWidth = nameLength;
        });
        var titleLength = this.tableChars.left.length + this.tableChars.right.length + this.name.length;
        var rowLength = this.tableChars.left.length +
            this.tableChars.right.length +
            this.tableChars.middle.length +
            this.nameColMaxWidth +
            this.idColMaxWidth;
        if (titleLength >= rowLength)
            this.width = titleLength;
        else
            this.width = rowLength;
        console.log(titleLength, rowLength);
    };
    CTable.prototype.render = function () {
        this.renderTop();
        this.renderMiddle();
        this.renderBottom();
        this.top.map(function (t, id) {
            console.log(t.join(""));
        });
        this.middle.map(function (m, id) {
            console.log(m.join(""));
        });
        this.bottom.map(function (b, id) {
            console.log(b.join(""));
        });
    };
    CTable.prototype.renderMiddle = function () {
        var _this = this;
        this.options.map(function (option, id) {
            _this.middle[id] = [_this.tableChars.left, (id + 1).toString()];
            for (var i = 0; i < _this.idColMaxWidth - (id + 1).toString().length; i++) {
                _this.middle[id].push(" ");
            }
            _this.middle[id].push(_this.tableChars.middle, option.name);
            for (var i = 0; i <=
                _this.width -
                    (_this.idColMaxWidth +
                        option.name.length +
                        _this.tableChars.middle.length +
                        _this.tableChars.left.length +
                        _this.tableChars.right.length); i++) {
                _this.middle[id].push(" ");
            }
            _this.middle[id].push(_this.tableChars.right);
        });
    };
    CTable.prototype.renderBottom = function () {
        this.bottom[0] = this.top[2];
        console.log(this.bottom[0]);
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.leftMiddle)
            .join(this.tableChars.bottomLeft)
            .split("");
        console.log(this.bottom[0]);
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.rightMiddle)
            .join(this.tableChars.bottomRight)
            .split("");
        console.log(this.bottom[0]);
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.topMiddle)
            .join(this.tableChars.bottomMiddle)
            .split("");
        console.log(this.bottom[0]);
    };
    CTable.prototype.renderTop = function () {
        this.top[0] = [this.tableChars.topLeft];
        this.top[1] = [this.tableChars.left, this.name];
        this.top[2] = [this.tableChars.leftMiddle];
        for (var i = 0; i <= this.width; i++) {
            if (i <=
                this.width - (this.tableChars.topLeft.length + this.tableChars.topRight.length)) {
                this.top[0].push(this.tableChars.middleMiddle);
            }
            if (i <=
                this.width -
                    (this.tableChars.left.length + this.tableChars.right.length + this.name.length)) {
                this.top[1].push(" ");
            }
            if (i < this.tableChars.left.length + this.idColMaxWidth) {
                this.top[2].push(this.tableChars.middleMiddle);
            }
            else if (i === this.tableChars.left.length + this.idColMaxWidth) {
                this.top[2].push(this.tableChars.topMiddle);
            }
            else if (i < this.width - 1) {
                this.top[2].push(this.tableChars.middleMiddle);
            }
        }
        this.top[0].push(this.tableChars.topRight);
        this.top[1].push(this.tableChars.right);
        this.top[2].push(this.tableChars.rightMiddle);
    };
    return CTable;
}());
exports.CTable = CTable;