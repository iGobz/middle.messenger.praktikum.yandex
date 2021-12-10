// export function hasClass(elem, className) {
//     return elem.classList.contains(className);
// }

// Function changes "." to "-" in keys in filenames object from in order to use them 
// in handlebars templates

export function fixFileNames(obj) {
    for (let oldKey in obj) {
        let newKey = oldKey.replace(".", "-");
        delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
    }
}

// This function checks all elements with specified className class if any of them exists in
// obj object's composedPath

export function hasClass(obj, className) {
    for (let el of document.querySelectorAll('.' + className)) {
        if (obj.composedPath().indexOf(el) > -1) return true;
    }
    return false;
}


// Polyfill for composedPath() Event method

(function (e, d, w) {
    if (!e.composedPath) {
        e.composedPath = function () {
            if (this.path) {
                return this.path;
            }
            var target = this.target;

            this.path = [];
            while (target.parentNode !== null) {
                this.path.push(target);
                target = target.parentNode;
            }
            this.path.push(d, w);
            return this.path;
        }
    }
})(Event.prototype, document, window);
