import { buildParser } from "@lezer/generator";
import { styleTags, tags } from "@lezer/highlight";
import { LRLanguage } from "@codemirror/language";
// eslint-disable-next-line import/no-webpack-loader-syntax
import grammar from "!!raw-loader!./qalam.grammar";

export const parser = buildParser(grammar).configure({
  props: [
    styleTags({
      Comment: tags.comment,
      Name: tags.variableName,
      "SuperReference/Super": tags.self,
      "SuperReference/Name": tags.propertyName,
      "SelfReference/Self": tags.self,
      "SelfReference/Name": tags.propertyName,
      "VariableReference/Name": tags.variableName,
      "FunctionCall/Name": tags.function(tags.variableName),
      "FunctionDeclaration/Name": tags.function(tags.variableName),
      "VariableDeclaration/Name": tags.definition(tags.variableName),
      Number: tags.number,
      Shai: tags.definitionKeyword,
      Amal: tags.definitionKeyword,
      Bool: tags.bool,
      Null: tags.null,
      "{ }": tags.brace,
      "[ ]": tags.squareBracket,
      "( )": tags.paren,
      Return: tags.keyword,
      String: tags.string,
      If: tags.controlKeyword,
      Else: tags.controlKeyword,
      Not: tags.operatorKeyword,
      And: tags.operatorKeyword,
      Or: tags.operatorKeyword,
      For: tags.controlKeyword,
      While: tags.controlKeyword,
      Kitab: tags.definitionKeyword,
      Ibn: tags.modifier,
    }),
  ],
});

const qalam = LRLanguage.define({
  parser,
});

export default qalam;
