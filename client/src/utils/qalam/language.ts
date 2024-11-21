import { buildParser } from "@lezer/generator";
import { styleTags, tags } from "@lezer/highlight";
import { LRLanguage } from "@codemirror/language";

export const grammar = `
@top Program { statement }

statement { FunctionCall | VariableDeclaration | FunctionDeclaration | ClassDeclaration | ReturnStmt | IfStmt | ElseStmt | ForStmt | WhileStmt | ExprStmt }

expression { LogicalExpr | FunctionCall }

LogicalExpr {
  OrExpr
}

OrExpr { AndExpr (Or AndExpr)* }

AndExpr { NotExpr (And NotExpr)* }

NotExpr { Not NotExpr | PrimaryExpr }

ExprStmt { expression ";" }

PrimaryExpr {
  "(" expression ")" |
  SuperReference |
  SelfReference |
  VariableReference |
  Number |
  Bool |
  Null |
  String
}

SuperReference { Super "." Name }

SelfReference { Self "." Name }

VariableDeclaration { Shai Name "=" expression ";" }

VariableReference { Name ("." Name)*? }

ClassDeclaration { Kitab Name (Ibn Name)? Block }

FunctionDeclaration { Amal Name "(" ParameterList ")" Block }

ForStmt { For "(" expression ";" expression ";" expression ")" Block }

WhileStmt { While "(" expression ")" Block }

FunctionCall { Name "(" ArgumentList ")" }

ReturnStmt { Return expression ";" }

IfStmt { If "(" expression ")" Block }

ElseStmt { Else Block }

ParameterList { Name ("," Name)* }

ArgumentList { expression ("," expression)* }

Block { "{" statement* "}" }

@tokens {
  Shai { "shai" }
  Bool { "haqq" | "batil" }
  Amal { "amal" }
  If { "itha" }
  Else { "illa" }
  Null { "ghaib" }
  Return { "radd" }
  Not { "la" }
  Or { "aw" }
  And { "wa" }
  For { "tawaf" }
  While { "baynama" }
  Self { "nafs" }
  Super { "ulya "}
  Name { @asciiLetter+ }
  Kitab { "kitab" }
  Ibn { "ibn" }
  Number { @digit+ }
  String { '"' (!["\\\\] | "\\\\" _)* '"' }
  whitespace { $[ \n\r\t] }
  "{" "}" "[" "]" "(" ")"
  @precedence { Shai, Bool, Amal, Null, Return, If, Else, String, For, While, Ibn, Kitab, Self, Super, Not, Or, And, Name }
}

@skip { whitespace }
`;

export const parser = buildParser(grammar).configure({
  props: [
    styleTags({
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
