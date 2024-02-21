import { ArabicString } from "../src/index";

test("returns true", () => {
  expect(ArabicString("كتب").stripNonLetters()).toBe("كتب");
});

test("returns true", () => {
  expect(ArabicString("كَتَبَ").stripNonLetters()).toBe("كتب");
});

test("returns true", () => {
  expect(
    ArabicString(
      "اللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍ فِيهَا مِصْبَاحٌ ۖ ٱلْمِصْبَاحُ فِى زُجَاجَةٍ ۖ ٱلزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّىٌّ يُوقَدُ مِن شَجَرَةٍ مُّبَـٰرَكَةٍ زَيْتُونَةٍ لَّا شَرْقِيَّةٍ وَلَا غَرْبِيَّةٍ يَكَادُ زَيْتُهَا يُضِىٓءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌ ۚ نُّورٌ عَلَىٰ نُورٍ ۗ يَهْدِى ٱللَّهُ لِنُورِهِۦ مَن يَشَآءُ ۚ وَيَضْرِبُ ٱللَّهُ ٱلْأَمْثَـٰلَ لِلنَّاسِ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌ"
    ).stripNonLetters()
  ).toBe(
    "الله نور ٱلسموت وٱلأرض  مثل نوره كمشكوة فيها مصباح  ٱلمصباح فى زجاجة  ٱلزجاجة كأنها كوكب درى يوقد من شجرة مبركة زيتونة لا شرقية ولا غربية يكاد زيتها يضىء ولو لم تمسسه نار  نور على نور  يهدى ٱلله لنوره من يشاء  ويضرب ٱلله ٱلأمثل للناس  وٱلله بكل شىء عليم"
  );
});