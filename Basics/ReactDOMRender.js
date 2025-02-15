//How does the renderDom function create and append DOM elements
// based on the dom object structure
const dom = {
  type: "section",
  props: {
    id: "section-1",
    class: "main-section",
    style: "background-color: lightblue; padding: 20px;border-radius: 5px;",
  },
  children: [
    {
      type: "header",
      children: "Welcome",
      props: {
        style: "font-size: 24px; color: darkblue; text-align: center;",
      },
    },
    {
      type: "article",
      children: [
        {
          type: "h2",
          children: "Render DOM",
          props: { style: "color: darkgreen;" },
        },
        {
          type: "p",
          children: "Try youself first then look for solution",
          props: { style: "font-size: 16px; color: grey;" },
        },
      ],
    },
    {
      type: "footer",
      children: "Thanks you :)",
      props: {
        style: "text-align: center; font-size: 14px; color: black;",
      },
    },
  ],
};

const rootElement = document.getElementById("root");

const renderDom = ({ type, props, children }) => {
  if (!type) {
    return null;
  } else {
    let newElement = document.createElement(type);

    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "style") {
          newElement.style.cssText = value;
        } else {
          newElement.setAttribute(key, value);
        }
      });
    }

    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => newElement.appendChild(renderDom(child)));
      } else if (typeof children === "string") {
        newElement.textContent = children;
      }
    }
    return newElement;
  }
};

if (rootElement) {
  rootElement.appendChild(renderDom(dom));
}
