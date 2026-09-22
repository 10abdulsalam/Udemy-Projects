import { franc } from 'franc';
import langs from 'langs';
import colors from 'colors';
 
const input = process.argv.slice(2).join(' ');

if (!input) {
    console.log(colors.yellow('Please provide some sample text as an argument.'));
    console.log(colors.yellow('Example: node index.js "This is some sample text in English."'));
    process.exit(1);
}

// Warn when input is very short — single words are often ambiguous
const minChars = 10;
if (input.replace(/\s+/g, '').length < minChars) {
    console.log(colors.yellow('Input is very short — try providing a longer sample for more reliable detection.'));
}

const langCode = franc(input);
if (langCode === 'und') {
    // Fallback: simple English word list heuristic for very short inputs
    const commonEnglish = new Set([
        'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us','hello','hi'
    ]);

    const normalized = input.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    const words = normalized.split(/\s+/).filter(Boolean);
    const allCommon = words.length > 0 && words.every(w => commonEnglish.has(w));

    if (allCommon) {
        console.log(colors.green('Our best guess is: English (fallback heuristic)'));
    } else {
        console.log(colors.red("SORRY, COULDN'T FIGURE IT OUT! TRY WITH MORE SAMPLE TEXT!"));
    }
} else {
    const language = langs.where("3", langCode);
    if (language) {
        console.log(colors.green(`Our best guess is: ${language.name}`));
    } else {
        console.log(colors.red(`SORRY, COULDN'T FIND A LANGUAGE FOR CODE: ${langCode}`));
    }
}