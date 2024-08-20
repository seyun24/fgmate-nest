export class BigIntTransformer {
  toPlain(value: BigInt): string {
    return value.toString();
  }

  toClass(value: string): BigInt {
    return BigInt(value);
  }
}
