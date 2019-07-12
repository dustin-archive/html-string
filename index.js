
var cache = new Map()

var voidTags = [
  'area', 'base', 'br', 'circle', 'col', 'ellipse', 'embed', 'img', 'input',
  'line', 'link', 'mesh', 'meta', 'param', 'path', 'polygon', 'polyline',
  'rect', 'source', 'track', 'wbr'
]

function h (tag, data, children) {
  var attrs = ''

  for (var attr in data) {
    attrs += ' ' + attr + '="' + (data[attr] + '').replace(/"/g, '\\"') + '"'
  }

  var el = '<' + tag + attrs

  if (voidTags.indexOf(tag) !== -1 && !children) {
    return el + '/>'
  }

  var inner = Array.isArray(children)
    ? children.join('')
    : children || ''

  return el + '>' + inner + '</' + tag + '>'
}

var html = new Proxy({}, {
  get: function (_target, name) {
    var fn = cache.get(name)

    if (fn) {
      return fn
    }

    fn = function (data, children) {
      if (typeof data === 'object' && !Array.isArray(data)) {
        return h(name, data, children)
      }

      return h(name, {}, data)
    }

    cache.set(fn)

    return fn
  }
})

export default html
