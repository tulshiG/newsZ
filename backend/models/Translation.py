# # # backend/app.py
# # from flask import Flask, request, jsonify
# # from transformers import MarianMTModel, MarianTokenizer

# # app = Flask(__name__)

# # # Load English → Hindi model
# # model_name = "Helsinki-NLP/opus-mt-en-hi"
# # tokenizer = MarianTokenizer.from_pretrained(model_name)
# # model = MarianMTModel.from_pretrained(model_name)

# # @app.route("/translate", methods=["POST"])
# # def translate():
# #     data = request.json
# #     text = data.get("text", "")
# #     if not text:
# #         return jsonify({"error": "No text provided"}), 400

# #     # Tokenize input
# #     tokens = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
# #     translated = model.generate(**tokens)

# #     result = tokenizer.decode(translated[0], skip_special_tokens=True)
# #     return jsonify({"translation": result})

# # if __name__ == "__main__":
# #     app.run(debug=True, port=5000)
# from transformers import MarianMTModel, MarianTokenizer

# class Translator:
#     def __init__(self, model_name="Helsinki-NLP/opus-mt-en-hi"):
#         # Load model and tokenizer
#         self.tokenizer = MarianTokenizer.from_pretrained(model_name)
#         self.model = MarianMTModel.from_pretrained(model_name)

#     def translate_text(self, text: str) -> str:
#         if not text:
#             return ""

#         # Tokenize input
#         tokens = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
#         translated = self.model.generate(**tokens)

#         # Decode result
#         return self.tokenizer.decode(translated[0], skip_special_tokens=True)
# models/Translation.py
# models/Translation.py
# models/Translation.py
from transformers import MarianMTModel, MarianTokenizer

class Translator:
    def __init__(self, src_lang="en", tgt_lang="hi"):
        self.model_name = f"Helsinki-NLP/opus-mt-{src_lang}-{tgt_lang}"
        self.tokenizer = MarianTokenizer.from_pretrained(self.model_name)
        self.model = MarianMTModel.from_pretrained(self.model_name)

    def translate(self, text):
        tokens = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        translated = self.model.generate(**tokens)
        return self.tokenizer.decode(translated[0], skip_special_tokens=True)
