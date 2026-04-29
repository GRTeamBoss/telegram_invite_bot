import pandas as pd

# читаем Excel
df1 = pd.read_excel("file.xlsx", "Лист1")
df2 = pd.read_excel("file.xlsx", "Лист2")

# конвертируем в JSON
json_data1 = df1.to_json(orient="records", force_ascii=False)
json_data2 = df2.to_json(orient="records", force_ascii=False)

# сохраняем
with open("./netlify/functions/json/output1.json", "w", encoding="utf-8") as f:
    f.write(json_data1)
with open("./netlify/functions/json/output2.json", "w", encoding="utf-8") as f:
    f.write(json_data1)