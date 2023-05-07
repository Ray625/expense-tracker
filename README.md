![myimage]()
![myimage]()
## 簡介
簡易的記帳簿，使用者登入後，可以新增、瀏覽、編輯及刪除支出紀錄。
## 功能
+ 瀏覽支出列表。  
+ 新增支出紀錄。  
+ 編輯支出紀錄。  
+ 刪除支出紀錄。  
+ 依照類別檢視支出紀錄。
## 環境設置
Node.js@18.14.0  
express@4.16.4  
express-handlebars@3.0.0  
body-parser@1.20.2  
method-override@3.0.0  
express-session@1.17.1  
passport@0.4.1  
passport-local@1.0.0  
connect-flash@0.1.1  
bcryptjs@2.4.3  
passport-facebook@3.0.0
## 開始使用
1. 請先安裝Node.js與npm  
2. clone專案至本地
3. 於終端機移至專案資料夾輸入:
```
npm install
```
4. 設定環境變數: 在專案資料夾下新增.env檔案，照著.env.example填入對應資料
```
MONGODB_URI = '你的連線字串'  
FACEBOOK_ID = '你的應用程式編號'  
FACEBOOK_SECRET = '你的應用程式密鑰'  
FACEBOOK_CALLBACK = http://localhost:3000/auth/facebook/callback  
SESSION_SECRET = ThisIsMySecret  
PORT = 3000
```
5. 新增種子資料
```
npm run seed
```
6. 啟用伺服器
```
npm run start
```
7. 若看見此訊息代表順利運行，打開瀏覽器進入到以下網址
```
The web app is running on http://localhost:3000
```
8. 若欲停止使用請輸入
```
Ctrl + C
```

