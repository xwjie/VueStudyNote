declare type ASTExpression = {
    type: 2;
    expression: string;
    text: string;
    tokens: Array<string | Object>;
    static?: boolean;
    // 2.4 ssr optimization
    ssrOptimizability?: number;
};

declare type ASTText = {
    type: 3;
    text: string;
    static?: boolean;
    isComment?: boolean;
    // 2.4 ssr optimization
    ssrOptimizability?: number;
};

declare type ASTNode = ASTElement | ASTText | ASTExpression;

declare type ASTElement = {
    type: 1;
    tag: string;
    //attrsList: Array<{ name: string; value: any }>;
    attrsMap: { [key: string]: any };
    parent?: ASTElement;
    children: Array<ASTNode>;
    directives?: Array<ASTDirective>;
}

declare type ASTDirective = {
  name: string;
  rawName: string;
  value: string;
  arg: ?string;
  modifiers: ?ASTModifiers;
};

declare type ASTModifiers = { [key: string]: boolean };
