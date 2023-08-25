// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class AuctionEnded extends ethereum.Event {
  get params(): AuctionEnded__Params {
    return new AuctionEnded__Params(this);
  }
}

export class AuctionEnded__Params {
  _event: AuctionEnded;

  constructor(event: AuctionEnded) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class BatchMetadataUpdate extends ethereum.Event {
  get params(): BatchMetadataUpdate__Params {
    return new BatchMetadataUpdate__Params(this);
  }
}

export class BatchMetadataUpdate__Params {
  _event: BatchMetadataUpdate;

  constructor(event: BatchMetadataUpdate) {
    this._event = event;
  }

  get _fromTokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _toTokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ClosingTimestampUpdated extends ethereum.Event {
  get params(): ClosingTimestampUpdated__Params {
    return new ClosingTimestampUpdated__Params(this);
  }
}

export class ClosingTimestampUpdated__Params {
  _event: ClosingTimestampUpdated;

  constructor(event: ClosingTimestampUpdated) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get updatedTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class DebrisAdded extends ethereum.Event {
  get params(): DebrisAdded__Params {
    return new DebrisAdded__Params(this);
  }
}

export class DebrisAdded__Params {
  _event: DebrisAdded;

  constructor(event: DebrisAdded) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get closingTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class MetadataUpdate extends ethereum.Event {
  get params(): MetadataUpdate__Params {
    return new MetadataUpdate__Params(this);
  }
}

export class MetadataUpdate__Params {
  _event: MetadataUpdate;

  constructor(event: MetadataUpdate) {
    this._event = event;
  }

  get _tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class MeteoriteAdded extends ethereum.Event {
  get params(): MeteoriteAdded__Params {
    return new MeteoriteAdded__Params(this);
  }
}

export class MeteoriteAdded__Params {
  _event: MeteoriteAdded;

  constructor(event: MeteoriteAdded) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get closingTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NewBid extends ethereum.Event {
  get params(): NewBid__Params {
    return new NewBid__Params(this);
  }
}

export class NewBid__Params {
  _event: NewBid;

  constructor(event: NewBid) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get bidder(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get newValue(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Patthar extends ethereum.SmartContract {
  static bind(address: Address): Patthar {
    return new Patthar("Patthar", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getClosingTimestamp(_tokenId: BigInt): BigInt {
    let result = super.call(
      "getClosingTimestamp",
      "getClosingTimestamp(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toBigInt();
  }

  try_getClosingTimestamp(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getClosingTimestamp",
      "getClosingTimestamp(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCurrentTokenId(): BigInt {
    let result = super.call(
      "getCurrentTokenId",
      "getCurrentTokenId():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCurrentTokenId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCurrentTokenId",
      "getCurrentTokenId():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getFloorValue(_tokenId: BigInt): BigInt {
    let result = super.call(
      "getFloorValue",
      "getFloorValue(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toBigInt();
  }

  try_getFloorValue(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getFloorValue",
      "getFloorValue(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getHighestBid(_tokenId: BigInt): BigInt {
    let result = super.call(
      "getHighestBid",
      "getHighestBid(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toBigInt();
  }

  try_getHighestBid(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getHighestBid",
      "getHighestBid(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getHightestBidder(_tokenId: BigInt): Address {
    let result = super.call(
      "getHightestBidder",
      "getHightestBidder(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toAddress();
  }

  try_getHightestBidder(_tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getHightestBidder",
      "getHightestBidder(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getType(_tokenId: BigInt): i32 {
    let result = super.call("getType", "getType(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toI32();
  }

  try_getType(_tokenId: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("getType", "getType(uint256):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  getUserBid(_tokenId: BigInt): BigInt {
    let result = super.call("getUserBid", "getUserBid(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toBigInt();
  }

  try_getUserBid(_tokenId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getUserBid", "getUserBid(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class ConcludeBidCall extends ethereum.Call {
  get inputs(): ConcludeBidCall__Inputs {
    return new ConcludeBidCall__Inputs(this);
  }

  get outputs(): ConcludeBidCall__Outputs {
    return new ConcludeBidCall__Outputs(this);
  }
}

export class ConcludeBidCall__Inputs {
  _call: ConcludeBidCall;

  constructor(call: ConcludeBidCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConcludeBidCall__Outputs {
  _call: ConcludeBidCall;

  constructor(call: ConcludeBidCall) {
    this._call = call;
  }
}

export class MintTokenCall extends ethereum.Call {
  get inputs(): MintTokenCall__Inputs {
    return new MintTokenCall__Inputs(this);
  }

  get outputs(): MintTokenCall__Outputs {
    return new MintTokenCall__Outputs(this);
  }
}

export class MintTokenCall__Inputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }

  get _tokenURI(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _type(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _closingTimestamp(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _floorPrice(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class MintTokenCall__Outputs {
  _call: MintTokenCall;

  constructor(call: MintTokenCall) {
    this._call = call;
  }
}

export class PlaceBidCall extends ethereum.Call {
  get inputs(): PlaceBidCall__Inputs {
    return new PlaceBidCall__Inputs(this);
  }

  get outputs(): PlaceBidCall__Outputs {
    return new PlaceBidCall__Outputs(this);
  }
}

export class PlaceBidCall__Inputs {
  _call: PlaceBidCall;

  constructor(call: PlaceBidCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class PlaceBidCall__Outputs {
  _call: PlaceBidCall;

  constructor(call: PlaceBidCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class UpdateClosingTimeCall extends ethereum.Call {
  get inputs(): UpdateClosingTimeCall__Inputs {
    return new UpdateClosingTimeCall__Inputs(this);
  }

  get outputs(): UpdateClosingTimeCall__Outputs {
    return new UpdateClosingTimeCall__Outputs(this);
  }
}

export class UpdateClosingTimeCall__Inputs {
  _call: UpdateClosingTimeCall;

  constructor(call: UpdateClosingTimeCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _updatedClosingTimestamp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateClosingTimeCall__Outputs {
  _call: UpdateClosingTimeCall;

  constructor(call: UpdateClosingTimeCall) {
    this._call = call;
  }
}

export class UpdateFloorValueCall extends ethereum.Call {
  get inputs(): UpdateFloorValueCall__Inputs {
    return new UpdateFloorValueCall__Inputs(this);
  }

  get outputs(): UpdateFloorValueCall__Outputs {
    return new UpdateFloorValueCall__Outputs(this);
  }
}

export class UpdateFloorValueCall__Inputs {
  _call: UpdateFloorValueCall;

  constructor(call: UpdateFloorValueCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _newValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateFloorValueCall__Outputs {
  _call: UpdateFloorValueCall;

  constructor(call: UpdateFloorValueCall) {
    this._call = call;
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _erc20Address(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
