## hohomall 쇼핑몰 사이트
REACT + DRF로 개발한 의류 쇼핑몰입니다.
 
 #### 바로가기 👉 http://www.hohomallshop.com

</br>


## 🌠 Service View

+ 서비스 웹사이트
 
 ![User](https://github.com/honge7694/hohomall/assets/76715487/e2057a72-822e-4645-a946-c67de24eb95d)


+ 관리자 웹사이트

 ![Admin](https://github.com/honge7694/hohomall/assets/76715487/c2c31803-575b-44c9-ac16-e5361c3b52da)

  


## 프로젝트 아키텍쳐


## IA

![io drawio (1)](https://github.com/honge7694/hohomall/assets/76715487/3ebeabb7-e167-4bbc-9f6d-8766467a3a83)




## 🛠 Stacks

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/Django_rest_framework-A50E15?style=for-the-badge&logo=Django&logoColor=white">  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white">  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/Amazon_Lightsail-ff9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/React-569A31?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Ant design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/jwt-4479A1?style=for-the-badge&logoColor=pink"> 


</br>

## 🤝 Project Rules
</br>

###  DB


</br>


## 📂 Structure
<details>
  <summary>BE</summary>
  
  ```
  📦backend
   ┣ 📂account
   ┃ ┣ 📜admin.py
   ┃ ┣ 📜apps.py
   ┃ ┣ 📜models.py
   ┃ ┣ 📜serializers.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜views.py
   ┣ 📂board
   ┃ ┣ 📜admin.py
   ┃ ┣ 📜apps.py
   ┃ ┣ 📜models.py
   ┃ ┣ 📜serializers.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜views.py
   ┣ 📂config
   ┃ ┣ 📂settings
   ┃ ┃ ┣ 📜common.py
   ┃ ┃ ┣ 📜dev.py
   ┃ ┃ ┗ 📜prod.py
   ┃ ┣ 📜asgi.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜wsgi.py
   ┣ 📂coupon
   ┃ ┣ 📜admin.py
   ┃ ┣ 📜apps.py
   ┃ ┣ 📜models.py
   ┃ ┣ 📜serializers.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜views.py
   ┣ 📂media
   ┃ ┣ 📂account
   ┃ ┣ 📂coupons
   ┃ ┣ 📂product
   ┃ ┣ 📂question
   ┣ 📂order
   ┃ ┣ 📜admin.py
   ┃ ┣ 📜apps.py
   ┃ ┣ 📜models.py
   ┃ ┣ 📜serializers.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜views.py
   ┣ 📂product
   ┃ ┣ 📜admin.py
   ┃ ┣ 📜apps.py
   ┃ ┣ 📜models.py
   ┃ ┣ 📜serializers.py
   ┃ ┣ 📜tests.py
   ┃ ┣ 📜urls.py
   ┃ ┣ 📜views.py
   ┗ 📂review
     ┣ 📜admin.py
     ┣ 📜apps.py
     ┣ 📜models.py
     ┣ 📜permissions.py
     ┣ 📜serializers.py
     ┣ 📜tests.py
     ┣ 📜urls.py
     ┗ 📜views.py
  ```
</details>

<details>
  <summary>FE</summary>

  ```
📦frontend
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┗ 📂styles
 ┃ ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┃ ┣ 📜responsive.css
 ┃ ┃ ┃ ┗ 📜scroll.css
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜AdminBrandDetail.js
 ┃ ┃ ┃ ┣ 📜AdminBrandEdit.js
 ┃ ┃ ┃ ┣ 📜AdminBrandList.js
 ┃ ┃ ┃ ┣ 📜AdminBrandNew.js
 ┃ ┃ ┃ ┣ 📜AdminOrderList.js
 ┃ ┃ ┃ ┣ 📜AdminProductEdit.js
 ┃ ┃ ┃ ┣ 📜AdminProductList.js
 ┃ ┃ ┃ ┣ 📜AdminProductNew.js
 ┃ ┃ ┃ ┣ 📜AdminUserList.js
 ┃ ┃ ┃ ┗ 📜AdminUserModal.js
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📜AnswerDetail.js
 ┃ ┃ ┃ ┣ 📜AnswerEdit.js
 ┃ ┃ ┃ ┣ 📜AnswerWrite.js
 ┃ ┃ ┃ ┣ 📜BoardList.js
 ┃ ┃ ┃ ┣ 📜QuestionDetail.js
 ┃ ┃ ┃ ┣ 📜QuestionEdit.js
 ┃ ┃ ┃ ┗ 📜QuestionWrite.js
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┣ 📂coupon
 ┃ ┃ ┃ ┣ 📜Coupon.js
 ┃ ┃ ┃ ┣ 📜CouponEdit.js
 ┃ ┃ ┃ ┗ 📜CouponNew.js
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┃ ┣ 📜Home.js
 ┃ ┃ ┃ ┣ 📜Main.js
 ┃ ┃ ┃ ┗ 📜Sidenav.js
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┗ 📜OrderHistoryList.js
 ┃ ┃ ┣ 📂product
 ┃ ┃ ┃ ┣ 📜ProductDetail.js
 ┃ ┃ ┃ ┣ 📜ProductList.js
 ┃ ┃ ┃ ┣ 📜ProductReview.js
 ┃ ┃ ┃ ┣ 📜ProductReviewEditModal.js
 ┃ ┃ ┃ ┗ 📜WishListModal.js
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┣ 📜RecentViewed.js
 ┃ ┃ ┃ ┣ 📜UserDelete.js
 ┃ ┃ ┃ ┣ 📜UserInfoEdit.js
 ┃ ┃ ┃ ┣ 📜UserPasswordEdit.js
 ┃ ┃ ┃ ┣ 📜UserProfile.js
 ┃ ┃ ┃ ┣ 📜UserProfileCartList.js
 ┃ ┃ ┃ ┣ 📜UserProfileOrderList.js
 ┃ ┃ ┃ ┗ 📜UserProfileReviewList.js
 ┃ ┃ ┣ 📜AppLayout.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜AdminBrandDetailPage.js
 ┃ ┃ ┃ ┣ 📜AdminBrandEditPage.js
 ┃ ┃ ┃ ┣ 📜AdminBrandListPage.js
 ┃ ┃ ┃ ┣ 📜AdminBrandNewPage.js
 ┃ ┃ ┃ ┣ 📜AdminOrderDetailPage.js
 ┃ ┃ ┃ ┣ 📜AdminOrderPage.js
 ┃ ┃ ┃ ┣ 📜AdminProductEditPage.js
 ┃ ┃ ┃ ┣ 📜AdminProductListPage.js
 ┃ ┃ ┃ ┣ 📜AdminProductNewPage.js
 ┃ ┃ ┃ ┣ 📜AdminUserListPage.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┣ 📜AnswerEditPage.js
 ┃ ┃ ┃ ┣ 📜AnswerPage.js
 ┃ ┃ ┃ ┣ 📜AnswerWritePage.js
 ┃ ┃ ┃ ┣ 📜BoardListPage.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜QuestionEditPage.js
 ┃ ┃ ┃ ┣ 📜QuestionPage.js
 ┃ ┃ ┃ ┗ 📜QuestionWritePage.js
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┣ 📜CartList.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂coupon
 ┃ ┃ ┃ ┣ 📜CouponEditPage.js
 ┃ ┃ ┃ ┣ 📜CouponNewPage.js
 ┃ ┃ ┃ ┣ 📜CouponPage.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜Order.js
 ┃ ┃ ┃ ┣ 📜OrderHistory.js
 ┃ ┃ ┃ ┣ 📜OrderHistoryDetail.js
 ┃ ┃ ┃ ┗ 📜OrderHistoryList.js
 ┃ ┃ ┣ 📂product
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜Product.js
 ┃ ┃ ┃ ┣ 📜ProductDetail.js
 ┃ ┃ ┃ ┣ 📜ProductSearchPage.js
 ┃ ┃ ┃ ┗ 📜ProductSubType.js
 ┃ ┃ ┣ 📜HomePage.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜Profile.js
 ┃ ┃ ┣ 📜SignIn.js
 ┃ ┃ ┗ 📜SignUp.js
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜useLocalStorage.js
 ┃ ┣ 📜api.js
 ┃ ┣ 📜Constants.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜index.scss
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┣ 📜setupTests.js
 ┃ ┣ 📜state.js
 ┃ ┗ 📜store.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
  ```
  
</details>
</br>


## 💻 Development

### 로그인/회원가입
+ email 인증을 통해 회원가입 가능합니다.
 + email 인증을 하지않으면 로그인 불가합니다.
 + admin 계정을 이용하여 인증으로 바꾸기 가능합니다.

</br>

### 검색
+ 상품 이름, 타입, 스타일, 브랜드 등을 검색을 통해 찾아볼 수 있습니다.
+ 

</br>

### 상품
+ 찜을 하여 상품을 장바구니에 담아 구매를 할 수 있습니다.
+ 


</br>

### 리뷰 및 별점

</br>

### QnA

</br>

### 프로필 페이지

- 사용자 정보 조회
- 내 프로필 정보 조회 / 수정 가능
-

### admin 페이지

</br>

