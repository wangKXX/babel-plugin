
module.exports = ({ types: t}) => {
  const isIF = node => t.isIfStatement(node);
  const isDEBUGG = name => name === "DEBUG"
  const isCONSOLE = name => name === "console"
  return {
    visitor: {
      IfStatement(path, { opts }) {
        const { test } = path.node
        if (isIF(path.node)  && isDEBUGG(test.name)) {
          opts.removeDebug && path.remove();
        }
      },
      Identifier(path) {
        if (isIF(path.parent)  && isDEBUGG(path.node.name)) {
          path.replaceWith(t.booleanLiteral(true))
        }
      },
      ExpressionStatement(path, { opts }) {
        if (!(path.node.expression && path.node.expression.callee)) return;
        const { object, property } = path.node.expression.callee
        if (!isCONSOLE(object.name)) return;
        // 根据参数保留某些console方法
        if ((opts.exclude || []).includes(property.name)) return;
        path.remove();
      },
      DebuggerStatement(path, { opts }) {
        opts.noDebugger && path.remove();
      }
    }
  }
}