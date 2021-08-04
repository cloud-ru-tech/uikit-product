'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _default(styleApi) {
  var {
    alias,
    and,
    not,
    startsWith,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    naturally,
    unicode,
  } = styleApi;
  return [
    // import "foo"
    {
      match: and(hasNoMember, isAbsoluteModule, not(moduleName(startsWith('@sbercloud')))),
    },
    {
      separator: true,
    }, // import "@sbercloud*"
    {
      match: and(hasNoMember, isAbsoluteModule, moduleName(startsWith('@sbercloud'))),
    },
    {
      separator: true,
    }, // import "./foo"
    {
      match: and(hasNoMember, isRelativeModule),
    },
    {
      separator: true,
    }, // import … from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    {
      separator: true,
    }, // import … from "foo";
    {
      match: and(isAbsoluteModule, not(moduleName(startsWith('@sbercloud')))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    {
      separator: true,
    }, // import ... from "@sbercloud*"
    {
      match: and(isAbsoluteModule, moduleName(startsWith('@sbercloud'))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    {
      separator: true,
    }, // import … from "./foo";
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      separator: true,
    },
  ];
}
exports.default = _default;
