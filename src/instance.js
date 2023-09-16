function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);

      if (properties) {
      }
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    LoadFromJson(o) {
      // load state for savegames
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }

    _GetTextWithStyle() {
      const inst = this._inst._sdkInst;
      return inst._isBBcodeEnabled
        ? inst._bbString.toFragmentList()
        : [C3.New(C3.TextFragment, { chArr: C3.SplitGraphemes(inst._text) })];
    }

    _DoMeasureWidth(frags) {
      const inst = this._inst._sdkInst;
      let renderer = inst._spriteFontText
        ? inst._spriteFontText
        : inst._rendererText;
      let width = 0;
      if (renderer._MaybeCreateMeasureContext) {
        renderer._MaybeCreateMeasureContext();
      }
      for (let i = 0; i < frags.length; i++) {
        let frag = frags[i];
        width += renderer._MeasureText(frag).width;
      }
      return width;
    }

    _DoMeasureHeight(frags) {
      const inst = this._inst._sdkInst;
      let renderer = inst._spriteFontText
        ? inst._spriteFontText
        : inst._rendererText;
      let height = 0;
      if (renderer._MaybeCreateMeasureContext) {
        renderer._MaybeCreateMeasureContext();
      }
      for (let i = 0; i < frags.length; i++) {
        let frag = frags[i];
        height = Math.max(height, renderer._MeasureText(frag).height);
      }
      return height;
    }

    _MeasureWidth(text) {
      return this._DoMeasureWidth([
        C3.New(C3.TextFragment, { chArr: C3.SplitGraphemes(text) }),
      ]);
    }
    _MeasureHeight(text) {
      return this._DoMeasureHeight([
        C3.New(C3.TextFragment, { chArr: C3.SplitGraphemes(text) }),
      ]);
    }
    _FullWidth() {
      return this._DoMeasureWidth(this._GetTextWithStyle());
    }
    _FullHeight() {
      return this._DoMeasureHeight(this._GetTextWithStyle());
    }
  };
}
