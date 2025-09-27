import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Navbar, Container, Nav, Row, Col, Form, Accordion, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React, { useId, useState } from "react";
import PropTypes from "prop-types";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const Navigation = () => /* @__PURE__ */ jsx(Navbar, { bg: "dark", variant: "dark", sticky: "top", expand: "lg", id: "navigation", children: /* @__PURE__ */ jsxs(Container, { children: [
  /* @__PURE__ */ jsx(Navbar.Brand, { children: "Arc Ward" }),
  /* @__PURE__ */ jsx(Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
  /* @__PURE__ */ jsxs(Navbar.Collapse, { id: "basic-navbar-nav", children: [
    /* @__PURE__ */ jsxs(Nav, { className: "me-auto", children: [
      /* @__PURE__ */ jsx(LinkContainer, { to: "/build", children: /* @__PURE__ */ jsx(Nav.Link, { children: "Build" }) }),
      /* @__PURE__ */ jsx(LinkContainer, { to: "/play", children: /* @__PURE__ */ jsx(Nav.Link, { children: "Play" }) })
    ] }),
    /* @__PURE__ */ jsxs(Nav, { className: "d-flex", children: [
      /* @__PURE__ */ jsx(LinkContainer, { to: "/", children: /* @__PURE__ */ jsx(Nav.Link, { children: "FAQ" }) }),
      /* @__PURE__ */ jsx(LinkContainer, { to: "/", children: /* @__PURE__ */ jsx(Nav.Link, { children: "Contact" }) })
    ] })
  ] })
] }) });
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx(Container, {
      children: /* @__PURE__ */ jsx(Row, {
        children: /* @__PURE__ */ jsx(Col, {
          children: /* @__PURE__ */ jsx(Outlet, {})
        })
      })
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Arc Ward"
  }, {
    name: "description",
    content: "Welcome to Arc Ward!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("div", {
    children: "Hello World!"
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const DIRECTION_TO_DEG = {
  right: 0,
  down: 90,
  left: 180,
  up: -90
};
const ArcMarker = React.forwardRef(({
  direction = "right",
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  rotate = 0,
  className = "",
  title = "Arc Marker",
  ariaLabel,
  style = {},
  visible = true,
  ...props
}, ref) => {
  const baseDeg = DIRECTION_TO_DEG[direction] ?? 0;
  const totalDeg = baseDeg + Number(rotate || 0);
  const transform = `rotate(${totalDeg} 12 12)`;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      role: ariaLabel ? "img" : "presentation",
      "aria-label": ariaLabel,
      className: `inline-block ${className}`,
      style: { ...style, visibility: visible ? "visible" : "hidden" },
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsxs("g", { transform, children: [
          /* @__PURE__ */ jsx(
            "line",
            {
              x1: "3",
              y1: "12",
              x2: "17",
              y2: "12",
              stroke: color,
              strokeWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "polyline",
            {
              points: "11 6 17 12 11 18",
              stroke: color,
              strokeWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none"
            }
          )
        ] })
      ]
    }
  );
});
ArcMarker.displayName = "ArcMarker";
const WardMarker = React.forwardRef(({
  variant = "line",
  // 'line' | 'corner'
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  rotate = 0,
  className = "",
  title = "Ward Marker",
  ariaLabel,
  style = {},
  visible = true,
  ...props
}, ref) => {
  const VIEWBOX_CENTER = 12;
  const transform = `rotate(${rotate} ${VIEWBOX_CENTER} ${VIEWBOX_CENTER})`;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      role: ariaLabel ? "img" : "presentation",
      "aria-label": ariaLabel,
      className: `inline-block ${className}`,
      style: { ...style, visibility: visible ? "visible" : "hidden" },
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsxs("g", { transform, children: [
          variant === "line" && // Centered horizontal line (midpoint at 12)
          /* @__PURE__ */ jsx(
            "line",
            {
              x1: "6",
              y1: "12",
              x2: "18",
              y2: "12",
              stroke: color,
              strokeWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          variant === "corner" && // Corner whose centroid is at (12,12): points chosen so the average of
          // the three polyline points equals (12,12). This keeps the L-shape
          // visually centered when rotated.
          // Points: (6,15) -> (15,15) -> (15,6)
          /* @__PURE__ */ jsx(
            "polyline",
            {
              points: "6,15 15,15 15,6",
              stroke: color,
              strokeWidth,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none"
            }
          )
        ] })
      ]
    }
  );
});
WardMarker.displayName = "WardMarker";
const CharacterMarker = React.forwardRef(({
  size = 24,
  // width and height of the SVG
  radius = null,
  // if null, computed as a fraction of size
  strokeWidth = 2,
  fill = "currentColor",
  stroke = "none",
  className = "",
  title = "Character Marker",
  ariaLabel,
  style = {},
  visible = true,
  ...props
}, ref) => {
  if (!visible) return null;
  const VIEWBOX_SIZE = 24;
  const cx = VIEWBOX_SIZE / 2;
  const cy = VIEWBOX_SIZE / 2;
  const defaultRadius = 6.5;
  const r = radius == null ? defaultRadius : radius;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: size,
      height: size,
      viewBox: `0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`,
      xmlns: "http://www.w3.org/2000/svg",
      role: ariaLabel ? "img" : "presentation",
      "aria-label": ariaLabel,
      className: `inline-block ${className}`,
      style,
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsx("circle", { cx, cy, r, fill, stroke, strokeWidth })
      ]
    }
  );
});
CharacterMarker.displayName = "CharacterMarker";
const CardDisplay = ({ cardObject }) => /* @__PURE__ */ jsxs(Container, { fluid: true, children: [
  /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
    /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(WardMarker, { variant: "corner", rotate: 180, visible: cardObject.wards[0] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-center", children: /* @__PURE__ */ jsx(WardMarker, { rotate: 0, visible: cardObject.wards[1] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsx(WardMarker, { variant: "corner", rotate: -90, visible: cardObject.wards[2] }) })
  ] }),
  /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
    /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: " " }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 225, visible: cardObject.arcs[0] }) }),
      /* @__PURE__ */ jsx(Col, { children: " " })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-center", children: /* @__PURE__ */ jsx(ArcMarker, { rotate: -90, visible: cardObject.arcs[1] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: " " }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: -45, visible: cardObject.arcs[2] }) }),
      /* @__PURE__ */ jsx(Col, { children: " " })
    ] }) })
  ] }),
  /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
    /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(WardMarker, { rotate: 90, visible: cardObject.wards[3] }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 180, visible: cardObject.arcs[3] }) }),
      /* @__PURE__ */ jsx(Col, { children: " " })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-center", children: /* @__PURE__ */ jsx(CharacterMarker, { visible: cardObject.character[0] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: " " }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 0, visible: cardObject.arcs[4] }) }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(WardMarker, { rotate: 90, visible: cardObject.wards[4] }) })
    ] }) })
  ] }),
  /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
    /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: " " }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 135, visible: cardObject.arcs[5] }) }),
      /* @__PURE__ */ jsx(Col, { children: " " })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-center", children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 90, visible: cardObject.arcs[6] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
      /* @__PURE__ */ jsx(Col, { children: " " }),
      /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(ArcMarker, { rotate: 45, visible: cardObject.arcs[7] }) }),
      /* @__PURE__ */ jsx(Col, { children: " " })
    ] }) })
  ] }),
  /* @__PURE__ */ jsxs(Row, { className: "g-0", children: [
    /* @__PURE__ */ jsx(Col, { children: /* @__PURE__ */ jsx(WardMarker, { variant: "corner", rotate: 90, visible: cardObject.wards[5] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-center", children: /* @__PURE__ */ jsx(WardMarker, { rotate: 0, visible: cardObject.wards[6] }) }),
    /* @__PURE__ */ jsx(Col, { className: "text-end", children: /* @__PURE__ */ jsx(WardMarker, { variant: "corner", rotate: 0, visible: cardObject.wards[7] }) })
  ] })
] });
CardDisplay.propTypes = {
  "cardObject": PropTypes.object
};
const CardBuilder = ({ cardObject, onChange }) => {
  const formId = useId();
  if (!cardObject) return null;
  const handleToggle = (group, index) => {
    const updated = { ...cardObject };
    updated[group] = [...updated[group]];
    updated[group][index] = !updated[group][index];
    onChange(updated);
  };
  const renderGroup = (groupName, items) => /* @__PURE__ */ jsx(
    Form.Group,
    {
      className: "mb-3",
      controlId: `${groupName}-form-${formId}`,
      children: items.map((checked, i) => /* @__PURE__ */ jsx(
        Form.Check,
        {
          className: "text-capitalize",
          type: "checkbox",
          id: `${groupName}-${formId}-${i}`,
          checked,
          onChange: () => handleToggle(groupName, i),
          label: /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center"
              },
              children: `${groupName} ${i + 1}`
            }
          )
        },
        `${groupName}-${formId}-${i}`
      ))
    }
  );
  return /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { children: renderGroup("arcs", cardObject.arcs) }),
    /* @__PURE__ */ jsx(Col, { children: renderGroup("wards", cardObject.wards) })
  ] }) }) });
};
function PrintView({ cardObjects }) {
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const rows = chunkArray(cardObjects, 3);
  return /* @__PURE__ */ jsx("div", { className: "print-view", children: /* @__PURE__ */ jsx(Container, { fluid: true, children: rows.map((row, rowIndex) => /* @__PURE__ */ jsx(Row, { className: "mb-4", children: row.map((cardObject, colIndex) => /* @__PURE__ */ jsx(
    Col,
    {
      xs: 4,
      className: "d-flex justify-content-center",
      children: /* @__PURE__ */ jsx("div", { className: "print-card", style: { width: "250px" }, children: /* @__PURE__ */ jsx(CardDisplay, { cardObject }) })
    },
    `col-${rowIndex}-${colIndex}`
  )) }, `row-${rowIndex}`)) }) });
}
function meta$1({}) {
  return [{
    title: "Arc Ward Build"
  }, {
    name: "description",
    content: "Arc Ward Build"
  }];
}
const cloneCard = (card) => JSON.parse(JSON.stringify(card));
const build = UNSAFE_withComponentProps(function Build() {
  const defaultCard = {
    arcs: [true, true, true, true, true, true, true, true],
    wards: [true, true, true, true, true, true, true, true],
    character: [true]
  };
  const [cardObjects, setCardObjects] = useState([cloneCard(defaultCard)]);
  const [printMode, setPrintMode] = useState(false);
  const handleUpdate = (index, updatedCard) => {
    const newCards = [...cardObjects];
    newCards[index] = updatedCard;
    setCardObjects(newCards);
  };
  const addCard = () => {
    setCardObjects([...cardObjects, cloneCard(defaultCard)]);
  };
  const removeCard = (index) => {
    const newCards = cardObjects.filter((_, i) => i !== index);
    setCardObjects(newCards);
  };
  return /* @__PURE__ */ jsx("div", {
    id: "build",
    children: /* @__PURE__ */ jsx(Container, {
      children: !printMode ? /* @__PURE__ */ jsxs(Fragment, {
        children: [cardObjects.map((cardObject, i) => /* @__PURE__ */ jsxs(Row, {
          className: "mb-2 align-items-center",
          children: [/* @__PURE__ */ jsx(Col, {
            children: /* @__PURE__ */ jsx(Accordion, {
              defaultActiveKey: "0",
              children: /* @__PURE__ */ jsxs(Accordion.Item, {
                eventKey: "0",
                children: [/* @__PURE__ */ jsxs(Accordion.Header, {
                  children: ["Card ", i + 1]
                }), /* @__PURE__ */ jsxs(Accordion.Body, {
                  children: [/* @__PURE__ */ jsx(CardBuilder, {
                    cardObject,
                    onChange: (updated) => handleUpdate(i, updated)
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-right mt-2",
                    children: /* @__PURE__ */ jsx(Button, {
                      variant: "danger",
                      size: "sm",
                      onClick: () => removeCard(i),
                      disabled: cardObjects.length <= 1,
                      children: "Remove"
                    })
                  })]
                })]
              })
            })
          }), /* @__PURE__ */ jsx(Col, {
            className: "d-flex justify-content-center",
            children: /* @__PURE__ */ jsx("div", {
              style: {
                width: "250px"
              },
              children: /* @__PURE__ */ jsx(CardDisplay, {
                cardObject
              })
            })
          })]
        }, `card-${i}`)), /* @__PURE__ */ jsx(Row, {
          children: /* @__PURE__ */ jsxs(Col, {
            children: [/* @__PURE__ */ jsx(Button, {
              onClick: addCard,
              children: "Add Card"
            }), /* @__PURE__ */ jsx(Button, {
              className: "ms-2",
              variant: "secondary",
              onClick: () => setPrintMode(true),
              children: "Switch to Print View"
            })]
          })
        })]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(PrintView, {
          cardObjects
        }), /* @__PURE__ */ jsx(Row, {
          className: "mt-3",
          children: /* @__PURE__ */ jsxs(Col, {
            children: [/* @__PURE__ */ jsx(Button, {
              variant: "primary",
              onClick: () => window.print(),
              children: "Print"
            }), /* @__PURE__ */ jsx(Button, {
              className: "ms-2",
              variant: "secondary",
              onClick: () => setPrintMode(false),
              children: "Back to Edit View"
            })]
          })
        })]
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: build,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Arc Ward Play"
  }, {
    name: "description",
    content: "Arc Ward Play"
  }];
}
const play = UNSAFE_withComponentProps(function Play() {
  return /* @__PURE__ */ jsx("div", {
    children: "Play"
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: play,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CYl7dQTx.js", "imports": ["/assets/chunk-B7RQU5TL-D-2o7E4h.js", "/assets/index-wirpkLcK.js", "/assets/dom-export-Cqp1mW11.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CyDvSwsp.js", "imports": ["/assets/chunk-B7RQU5TL-D-2o7E4h.js", "/assets/index-wirpkLcK.js", "/assets/dom-export-Cqp1mW11.js", "/assets/Row-D4iuzOLX.js"], "css": ["/assets/root-Bd55mFi0.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-D9hv-b5v.js", "imports": ["/assets/chunk-B7RQU5TL-D-2o7E4h.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/build": { "id": "routes/build", "parentId": "root", "path": "build", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/build-DuUvRTzh.js", "imports": ["/assets/chunk-B7RQU5TL-D-2o7E4h.js", "/assets/Row-D4iuzOLX.js", "/assets/index-wirpkLcK.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/play": { "id": "routes/play", "parentId": "root", "path": "play", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/play-iNoUi98c.js", "imports": ["/assets/chunk-B7RQU5TL-D-2o7E4h.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-957442b3.js", "version": "957442b3", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/build": {
    id: "routes/build",
    parentId: "root",
    path: "build",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/play": {
    id: "routes/play",
    parentId: "root",
    path: "play",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
