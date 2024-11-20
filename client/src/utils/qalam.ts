import { buildParser } from "@lezer/generator"
import { styleTags, tags } from "@lezer/highlight"
import { LRLanguage } from "@codemirror/language"

export const grammar = `
@top Program { statement }

statement { VariableDeclaration | FunctionDeclaration | ReturnStmt | IfStmt | ElseStmt }

expression { LogicalExpr | FunctionCall }

LogicalExpr {
  OrExpr
}

OrExpr { AndExpr (Or AndExpr)* }

AndExpr { NotExpr (And NotExpr)* }

NotExpr { Not NotExpr | PrimaryExpr }

PrimaryExpr {
  "(" expression ")" |
  Name |
  Number |
  Bool |
  Null |
  String
}

VariableDeclaration { Shai Name "=" expression ";" }

FunctionDeclaration { Amal Name "(" ParameterList ")" Block }

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
  Name { @asciiLetter+ }
  DeclName { Name }
  Number { @digit+ }
  String { '"' (!["\\\\] | "\\\\" _)* '"' }
  whitespace { $[ \n\r\t] }
  "{" "}" "[" "]" "(" ")"
  @precedence { Shai, Bool, Amal, Null, Return, If, Else, String, Not, Or, And, Name }
}

@skip { whitespace }
@detectDelim
`

export const parser = buildParser(grammar).configure({
  props: [
    styleTags({
      Name: tags.name,
      DeclName: tags.function(tags.name), 
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
    })
  ]
})

const qalam = LRLanguage.define({
  parser
})

export default qalam;