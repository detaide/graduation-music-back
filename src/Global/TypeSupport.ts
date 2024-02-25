
/**
 * 历史坑，原生BigInt上没有toJSON方法
 */
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

