// enum.js
function Enum(baseEnum) {
    return new Proxy(baseEnum, {
      get(target, name) {
        if (name === 'hasOwnProperty') {
          return target.hasOwnProperty.bind(target);
        }
        if (!baseEnum.hasOwnProperty(name)) {
          throw new Error(`"${name}" value does not exist in the enum`)
        }
        return baseEnum[name]
      },
      set(target, name, value) {
        throw new Error('Cannot add a new value to the enum')
      }
    });
  }

  module.exports = Enum;