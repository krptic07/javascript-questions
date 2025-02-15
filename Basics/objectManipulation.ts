// Write a function flattenObject that takes a nested object and converts it
// into a flat object,where keys represent the path to each value in the
// original object.
// The function should handle nested objects, arrays, and primitive types, functions, Date, RegExp, and
// null.

const objectFlatten = (
  obj: Record<string, any>,
  prefix?: string,
  result: Record<string, any> = {}
): Record<string, any> => {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    throw Error("Not an object");
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const addPrefix = prefix ? `${prefix}_${key}` : `${key}`;
        if (obj[key] instanceof Date) {
          result[addPrefix] = new Date(obj[key]);
        } else if (obj[key] instanceof RegExp) {
          result[addPrefix] = new RegExp(obj[key].source, obj[key].flags);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((element, index) => {
            let arrayAddPrefix = `${addPrefix}_${index}`;
            if (!Array.isArray(element) && typeof element !== "object") {
              result[arrayAddPrefix] = element;
            } else if (element instanceof Date) {
              result[arrayAddPrefix] = new Date(element);
            } else if (element instanceof RegExp) {
              result[arrayAddPrefix] = new RegExp(
                element.source,
                element.flags
              );
            } else {
              objectFlatten(element, arrayAddPrefix, result);
            }
          });
        } else if (obj[key] !== null && typeof obj[key] === "object") {
          objectFlatten(obj[key], addPrefix, result);
        } else {
          result[addPrefix] = obj[key];
        }
      }
    }
    return result;
  }
};

const test_object = {
  name: "John",
  age: 30,
  regexTest: /abc/i,
  birth: new Date(1994, 5, 24),
  city: "New York",
  addr: ["chandpol", "avv", ["polly", "lond", "dhna"], new Date(1394, 5, 24)],
  myUndefined: undefined,
  myNull: null,
  circularRef: null,
  nested: {
    name: "Nested",
    valid: true,
    some: [3, 4, 5, 2, { test: "78", cure: "nothing" }],
    true: {
      why: "justTesting",
    },
  },
  fn: () => {},
};

// console.log(objectFlatten(test_object, "person"));

//Implement polyfill for deep cloning OBject

const deepClone = (obj, seen = new WeakMap()) => {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj;
  }
  // if (seen.has(obj)) {
  //   return seen.get(obj);
  // }
  else {
    let clone = Array.isArray(obj) ? [] : {};
    // seen.set(obj, clone);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Date) {
          clone[key] = new Date(obj[key]);
        } else if (obj[key] instanceof RegExp) {
          clone[key] = new RegExp(obj[key].source, obj[key].flags);
        } else if (typeof obj[key] === "object") {
          clone[key] = deepClone(obj[key]);
        } else {
          clone[key] = obj[key];
        }
      }
    }
    return clone;
  }
};

// let ansClone = deepClone(test_object);
// console.log(ansClone);

const jsonStringify = (value) => {
  if (value === null || value === undefined || value === Symbol()) {
    return "null";
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return `${value}`;
  }
  if (value instanceof Date) {
    return `${new Date(value)}`;
  }
  if (typeof value === "function") {
    return undefined;
  } else if (Array.isArray(value)) {
    let arrayResult = value
      .map((item) =>
        jsonStringify(item) === "undefined" ? "null" : jsonStringify(item)
      )
      .join(",");
    return `[${arrayResult}]`;
  } else if (typeof value === "object") {
    let objResult = Object.entries(value)
      .filter(
        ([key, value]) => value !== undefined && typeof value !== "function"
      )
      .map(([key, value]) => `${key}:${jsonStringify(value)}`)
      .join(",");
    return `{${objResult}}`;
  }
  throw new Error(`unsupported Data Type: ${typeof value}`);
};

const test_object_2 = {
  name: "John",
  age: 30,
  birth: new Date(1994, 5, 24),
  city: "New York",
  addr: ["chandpol", "avv", ["polly", "lond", "dhna"], new Date(1394, 5, 24)],
  myUndefined: undefined,
  myNull: null,
  circularRef: null,
  nested: {
    name: "Nested",
    valid: true,
    some: [3, 4, 5, 2, { test: "78", cure: "nothing" }],
    true: {
      why: "justTesting",
    },
  },
  fn: () => {},
};

console.log(jsonStringify(test_object_2));
