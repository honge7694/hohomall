## hohomall 쇼핑몰 사이트
프론트(REACT) + 백엔드(DRF)로 REST API를 기반으로 개발한 의류 쇼핑몰입니다.
프론트엔드에서 수집한 데이터를 백엔드로 전달하고, 그 결과를 다시 프론트엔드로 반환하는 과정을 통해 양쪽 영역이 어떻게 상호 의존적으로 동작하는지를 몸소 체감하게 되었습니다.


 #### 바로가기 👉 http://www.hohomallshop.com
ID : admin@naver.com 
<br/>
PW : asdf1234
</br>


## 🌠 Service View

#### 서비스 웹사이트

![ezgif com-video-to-gif](https://github.com/honge7694/hohomall/assets/76715487/518af87b-b0b0-407c-ab52-698439485dd6)

 


#### 관리자 웹사이트

 ![Admin](https://github.com/honge7694/hohomall/assets/76715487/c2c31803-575b-44c9-ac16-e5361c3b52da)


## 🛠 Stacks

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"> <img src="https://img.shields.io/badge/Django_rest_framework-A50E15?style=for-the-badge&logo=Django&logoColor=white">  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white">  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/Amazon_Lightsail-ff9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"> <img src="https://img.shields.io/badge/React-569A31?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Ant design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white"> <img src="https://img.shields.io/badge/jwt-4479A1?style=for-the-badge&logoColor=pink"> 

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

#### 로그인/회원가입
![image](https://github.com/honge7694/hohomall/assets/76715487/f3fe5a94-3fc1-4d05-8cbf-2c34cb1634cc)
+ 회원가입을 완료하면 `send_email_verification` 함수를 통해 가입한 이메일로 인증 주소가 있는 메일을 발송합니다.
  +  `naver smtp`를 이용하였으며, user_id를 `signing.dumps()`을 통해 암호화한 토큰으로 만들고, 토큰을 이용하여 유저를 인증합니다.
+ 링크를 클릭하여 인증이 완료되면 프론트엔드의 로그인 화면으로 이동이 됩니다.
  + `signing.loads()`를 이용하여 token에 있는 user_id를 꺼내 DB에 user_id가 존재하면 완료됩니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/686b27ef-03e0-42ec-b35e-ecd376008669)
+ 로그인을 진행하면 `django-simplejwt`를 이용하여 토큰을 관리하며, `serializers.py`에서 TokenObtainPairSerializer을 상속받아 
토큰을 커스텀하여 로그인 결과에 nickname, status, is_admin을 추가하여 보냅니다.
  + nickname, status, is_admin은 front-end에서 `recoil-persist`를 이용하여 전역상태관리를 하였습니다.
  + token의 데이터들은 LocalStorage에 저장되어 사용됩니다.
  + is_admin을 이용하여 admin 페이지에 접근을 활용합니다.

</br>

#### 마이페이지
![image](https://github.com/honge7694/hohomall/assets/76715487/3b740281-8c12-492d-8099-c851afd30969)
+ 회원탈퇴
  + front-end에서 전달 받은 현재 비밀번호를 `check_password`를 통하여 검증하여 일치 여부를 판단 후 회원을 삭제합니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/e832bdc0-143f-43c7-9052-b6ea5ffb37b7)
+ 비밀번호 변경
  + 회원탈퇴와는 다르게 serializers.py에서 작업했으며, instance.check_password를 통해 현재 비밀번호가 일치한다면 수정된 비밀번호를 가진 instance를 반환합니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/b46eae7c-804e-4186-9b68-6225db7e637b)
+ 최근 본 상품
  + front-end에서 상품을 클릭하였을 때 데이터가 저장되며, `timezone`와 `timedelta`의 차이만큼 데이터를 보여줍니다.
  + 최근에 본 상품을 중복 클릭하게 되면, RecentViewed.objects.filter(user_id=user, product_id=product).exists()를 통해 존재 여부를 판단하여 삭제 후 데이터를 저장합니다.

</br>

### 검색
![image](https://github.com/honge7694/hohomall/assets/76715487/0928b92d-8ed1-491d-aad2-c55a5a2976e7)

+ `Q`객체를 이용하여 front-end에서 넘어오는 string 값을 포함하고 있다면 검색의 결과를 반환 되도록 하였습니다. 
   

</br>

### 상품
![image](https://github.com/honge7694/hohomall/assets/76715487/a0809a9f-4d47-4c3c-9503-2bc78dcef744)

+ 상품조회
  + 상품의 세부 정보로 들어가게 되면 retrieve 함수를 통해 view_count + 1이 되어 조회수가 증가합니다.
  + type(티, 셔츠 등), subtype(티(반팔, 긴팔 등), 셔츠(반팔셔츠, 긴팔셔츠 등)으로 조회할 때 사용되는 view입니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/95eb73e5-9f2f-4af0-8764-47194307fa53)

+ 상품생성 (admin)
  + front-end에서 상품의 데이터와 사진리스트, 상품옵션리스트 데이터를 받아와서 반복문을 이용하여 각각의 테이블에 저장합니다.
  + 상품옵션리스트는 `json.loads()`를 통하여 파이썬 데이터로 변환 후 `dict()`로 변환하여 저장하게 됩니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/cd9dd5c1-85e6-4568-a7c8-7edddcc97d97)

+ 상품수정 (admin)
  + 상품의 데이터, 새로운 옵션, 삭제한 옵션, 새로운 이미지, 삭제한 이미지들을 전달 받습니다.
  

</br>

### 리뷰 및 별점
![image](https://github.com/honge7694/hohomall/assets/76715487/91cddea1-1683-41dd-b78d-b2618f762d4a)
+ 로그인한 유저와 상품의 id를 전달 받아 Purchase 조회 후 리뷰 작성 가능 여부를 판단합니다.


![image](https://github.com/honge7694/hohomall/assets/76715487/ec962541-6845-4398-87c5-400245414d0f)
+ 리뷰 생성 및 수정, 좋아요 코드이며, 좋아요를 한번 누를시 리뷰의 id를 받아와 ReviewLike에 생성합니다.
+ 리뷰가 존재한다면 기존에 생성된 데이터를 삭제합니다.



</br>

### 찜 & 주문 
![image](https://github.com/honge7694/hohomall/assets/76715487/455edf06-acc4-4241-94fe-5e8ca975a2a8)
+ front-end에서 선택한 상품과 상품의 옵션, 가격을 받아 데이터를 저장합니다.
+ 데이터가 이미 존재할 시 `F` 객체를 사용하여 상품의 개수 필드를 수정합니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/04edaec1-a5eb-438b-8a4c-a59c135b5bf1)

+ 장바구니에서 체크한 후 주문한 상품의 정보, 옵션, 브랜드, 사용한 쿠폰를 전달 받습니다.
+ Order에는 주문자명, 배달지, 전화번호 등이 저장되며, OrderDetail에는 상품들의 세부 정보들이 저장됩니다.
+ 사용한 쿠폰의 pk가 존재한다면 쿠폰의 상태를 사용한 것으로 업데이트합니다.
+ 주문이 성공적으로 완료되면 장바구니에서 체크되었던 아이템들을 삭제합니다.
+ 주문할시 OrderStatus가 생성되며, 배송상태를 나타냅니다.

![image](https://github.com/honge7694/hohomall/assets/76715487/7f2b4f0f-ffde-4797-8573-42ea758a33ec)

+ 주문의 삭제는 front-end에서 배송상태가 배송준비중일 때만 삭제가 되며, 사용했던 쿠폰이 있다면 쿠폰을 미사용으로 변경합니다.


</br>

## 🤝 Project Rules
</br>

###  DB
![Untitled](https://github.com/honge7694/hohomall/assets/76715487/a12468f8-dc60-4d15-97ef-d68f7385eda1)


## 프로젝트 아키텍쳐

### IA
![io drawio (1)](https://github.com/honge7694/hohomall/assets/76715487/3ebeabb7-e167-4bbc-9f6d-8766467a3a83)


## 회고
프로젝트명: 쇼핑몰 프로젝트 - 리액트 & Django

이번 프로젝트를 통해 리액트와 Django를 활용하여 쇼핑몰 웹 애플리케이션을 개발하게 되었습니다. 

배운 점
+ 리액트 컴포넌트 기반 개발: 프로젝트에서 리액트를 활용하여 컴포넌트 기반 개발 방법을 익히게 되었습니다. 컴포넌트 재사용을 통해 코드의 가독성과 유지보수성을 향상시킬 수 있음을 깨달았습니다.
+ Django 외래키 이용: 프로젝트를 진행하면서 Django의 외래키 개념을 활용하여 데이터베이스 간의 관계를 효율적으로 구성하는 방법을 배웠습니다. 특히 외래키를 이용하여 다른 테이블과의 관계를 형성하고, 연관된 데이터를 한번에 삽입하는 방법을 익혔습니다. 이를 통해 데이터 간의 일관성을 유지하면서도 데이터의 관계를 명확히 표현할 수 있는 장점을 깨달았습니다.
+ 다중 이미지 및 데이터 처리: 프로젝트에서 다중 이미지나 다양한 데이터를 효과적으로 처리하는 방법을 배웠습니다. 다중 이미지 업로드를 위한 라이브러리를 활용하고, 이미지 데이터를 관리하는 방법을 습득했습니다. 또한 데이터를 한 번에 여러 개 처리하는 방법을 익히면서, 데이터 처리의 효율성을 향상시킬 수 있음을 깨달았습니다. 이를 통해 사용자가 여러 개의 이미지를 한 번에 업로드하거나, 다양한 정보를 효율적으로 입력할 수 있는 기능을 개발할 수 있었습니다. 이러한 다중 데이터 처리 능력은 실제 프로젝트에서 데이터의 다양성과 양이 증가할 때 더욱 중요한 역할을 할 것으로 기대됩니다.
+ 상태 관리와 API 통신: 리액트의 상태 관리 라이브러리를 사용하여 상태를 효과적으로 관리하고, Django의 REST 프레임워크를 통해 백엔드와의 API 통신을 구현하는 방법을 습득하였습니다.

성장한 점
+ 풀스택 개발 능력 향상: 프로젝트를 통해 프론트엔드와 백엔드 개발 모두에 도전하면서 풀스택 개발 능력이 크게 향상되었습니다. 이제는 전체적인 흐름을 이해하고 독립적으로 개발할 수 있게 되었습니다.
+ 프로젝트 관리와 계획 수립: 프로젝트 초기에 계획을 세우고, 기능별로 작업을 분배하여 효율적으로 개발하는 방법을 배웠습니다. 프로젝트 관리와 계획 수립의 중요성을 더욱 깨달았습니다.

개선할 점
+ 테스트와 보안 강화: 프로젝트에서 테스트 코드 작성과 보안 측면을 강화하지 못한 점이 아쉽습니다. 향후에는 테스트 주도 개발과 보안을 더욱 고려하여 개발하려고 합니다.
+ 디자인과 사용자 경험: 디자인과 사용자 경험 부분에 더욱 신경을 써야 함을 깨달았습니다. 다양한 UI/UX 디자인을 습득하여 사용자에게 더 나은 경험을 제공하고자 합니다.

미래 계획
+ 서비스 확장: 프로젝트에서 개발한 쇼핑몰을 실제 서비스로 확장하고 싶습니다. 추가 기능 구현과 사용자 피드백을 통한 지속적인 업데이트를 진행하고자 합니다.
+ 새로운 기술 습득: 다양한 프론트엔드 및 백엔드 기술을 더욱 깊이 습득하여, 다음 프로젝트에서 더 효과적인 개발을 할 수 있도록 하려고 합니다.


이번 프로젝트를 통해 풀스택 개발 능력을 키우고, 개발 프로세스에서의 다양한 측면을 경험할 수 있었습니다. 미래에는 더 나은 프로젝트를 개발하고 성장해 나가기 위해 노력하겠습니다.
