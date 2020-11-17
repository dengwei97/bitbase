<template>
  <div class="container" v-if="Object.keys(details).length > 0">
    <div class="top-banner">
      <img
        class="head_img"
        v-if="details.avatarUrl"
        :src="details.avatarUrl"
        alt
      />
      <img
        v-else
        class="head_img"
        src="@/assets/transactions/img_avatar.png"
        alt
        srcset
      />
      <div class="xj" @click="updateImage = true">
        <img src="@/assets/transactions/ico_camera_small_circle.png" alt="" />
      </div>
      <span class="nickname">
        {{ details.nickname }}&nbsp;
        <svg
          @click="updateUname = true"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 8V10H2L10 2L8 0L0 8ZM5.5 9C5.22386 9 5 9.22386 5 9.5C5 9.77614 5.22386 10 5.5 10H9.5C9.77614 10 10 9.77614 10 9.5C10 9.22386 9.77614 9 9.5 9H5.5Z"
            fill="white"
          />
        </svg>
      </span>
      <span class="uid">UID: {{ details.userId }}</span>
    </div>
    <div class="content">
      <h3 class="title">账户设置</h3>
      <ul>
        <li>
          <div class="left v_c">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2546 23.4479H7.34356C5.54132 23.4479 4.07617 21.9827 4.07617 20.1805V3.82012C4.07617 2.01788 5.54133 0.552734 7.34356 0.552734H16.258C18.0602 0.552734 19.5254 2.01789 19.5254 3.82012V20.1805C19.5254 21.9827 18.0569 23.4479 16.2546 23.4479ZM7.34356 1.6274C6.13539 1.6274 5.15083 2.61196 5.15083 3.82013V20.1805C5.15083 21.3887 6.13539 22.3732 7.34356 22.3732H16.258C17.4662 22.3732 18.4507 21.3887 18.4507 20.1805V3.82013C18.4507 2.61196 17.4662 1.6274 16.258 1.6274H7.34356ZM13.1241 4.14386H10.4741C10.1771 4.14386 9.9368 3.90356 9.9368 3.60652C9.9368 3.30949 10.1771 3.06919 10.4741 3.06919H13.1241C13.4211 3.06919 13.6614 3.30949 13.6614 3.60652C13.6614 3.90356 13.4211 4.14386 13.1241 4.14386ZM9.93679 19.6932C9.93679 20.7211 10.7712 21.5555 11.7991 21.5555C12.8271 21.5555 13.6614 20.7211 13.6614 19.6932C13.6614 18.6652 12.8271 17.8309 11.7991 17.8309C10.7712 17.8309 9.93679 18.6652 9.93679 19.6932ZM11.0115 19.6932C11.0115 19.2593 11.3652 18.9056 11.7991 18.9056C12.233 18.9056 12.5868 19.2593 12.5868 19.6932C12.5868 20.1271 12.233 20.4808 11.7991 20.4808C11.3652 20.4808 11.0115 20.1271 11.0115 19.6932Z"
                fill="#FF5950"
              />
            </svg>
            手机号
          </div>
          <div class="right c_des" v-if="details.mobile">
            {{ details.mobile | mobile }}
          </div>
        </li>
        <li @click="gomMethodOfCollection">
          <div class="left v_c">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.556 4.58105H3.44488C2.76986 4.58105 2.22266 5.14945 2.22266 5.8506V19.1809C2.22266 19.882 2.76986 20.4504 3.44488 20.4504H20.556C21.231 20.4504 21.7782 19.882 21.7782 19.1809V5.8506C21.7782 5.14945 21.231 4.58105 20.556 4.58105ZM20.556 8.38973V5.85063H3.44488V8.38973H20.556ZM20.556 9.65925H3.44488V19.1809H20.556V9.65925ZM5.88933 12.1983H9.55601C9.89352 12.1983 10.1671 12.4825 10.1671 12.8331C10.1671 13.1837 9.89352 13.4679 9.55601 13.4679H5.88933C5.55183 13.4679 5.27822 13.1837 5.27822 12.8331C5.27822 12.4825 5.55183 12.1983 5.88933 12.1983ZM8.33379 14.7374H5.88933C5.55183 14.7374 5.27822 15.0216 5.27822 15.3722C5.27822 15.7228 5.55183 16.007 5.88933 16.007H8.33379C8.67129 16.007 8.9449 15.7228 8.9449 15.3722C8.9449 15.0216 8.67129 14.7374 8.33379 14.7374Z"
                fill="#0CB397"
              />
            </svg>
            收款方式
          </div>
          <div class="right">
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.09525L1.04494 0L6 5.19361L1.04494 10.3872L0 9.29197L3.90952 5.19333L0 1.09525Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>
        </li>
      </ul>
      <h3 class="title">身份验证</h3>
      <ul>
        <li>
          <div class="left v_c">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.62128 4.36914C3.317 4.36914 2.37695 5.34229 2.37695 6.7004V18.0234C2.37695 19.3815 3.31698 20.3546 4.62128 20.3546H19.3696C20.6739 20.3546 21.6139 19.3815 21.6139 18.0234V6.7004C21.6139 5.34229 20.6739 4.36914 19.3696 4.36914H4.62128ZM19.3697 19.3555H4.62128C3.81059 19.3555 3.33879 18.8674 3.33879 18.0234V6.7004C3.33879 5.85622 3.81076 5.36823 4.62128 5.36823H19.3696C20.1801 5.36823 20.6521 5.85628 20.6521 6.7004V18.0234C20.6521 18.0234 20.3511 19.3555 19.3697 19.3555ZM17.321 10.3637H14.044C13.7984 10.3637 13.5985 10.1397 13.5985 9.86413C13.5985 9.5887 13.7984 9.36465 14.044 9.36465H17.321C17.5667 9.36465 17.7666 9.5887 17.7666 9.86413C17.7666 10.1397 17.5667 10.3637 17.321 10.3637ZM14.044 13.028H17.321C17.5667 13.028 17.7666 12.8038 17.7666 12.5285C17.7666 12.2529 17.5667 12.0289 17.321 12.0289H14.044C13.7984 12.0289 13.5985 12.2528 13.5985 12.5285C13.5985 12.8038 13.7984 13.028 14.044 13.028ZM14.046 14.6931H18.9221L18.9221 14.6931C19.1689 14.6931 19.3697 14.9172 19.3697 15.1927C19.3697 15.4682 19.1689 15.6921 18.9221 15.6921H14.046C13.7993 15.6921 13.5986 15.4682 13.5986 15.1927C13.5986 14.9172 13.7993 14.6931 14.046 14.6931ZM11.5499 14.0327C11.0251 13.4536 10.3544 13.0316 9.61045 12.8125L9.54767 12.7941L9.60519 12.7623C10.4094 12.3199 10.909 11.4726 10.909 10.5508C10.909 9.16221 9.80916 8.03244 8.4573 8.03244C7.10498 8.03244 6.00485 9.16219 6.00485 10.5508C6.00485 11.4723 6.50424 12.3195 7.30831 12.762L7.36582 12.7937L7.30315 12.8123C6.56117 13.0307 5.89172 13.4509 5.36707 14.0276C4.83159 14.6163 4.47063 15.3444 4.32338 16.1331C4.30067 16.2535 4.32507 16.3755 4.392 16.4769C4.45901 16.5784 4.56108 16.6472 4.67832 16.6704C4.70759 16.6767 4.73738 16.6799 4.76726 16.6799C4.978 16.6799 5.16036 16.5226 5.20112 16.3057C5.4993 14.7078 6.88086 13.6939 8.46868 13.6939C10.0616 13.6939 11.4186 14.7129 11.7127 16.3176C11.7523 16.5341 11.9369 16.6912 12.1513 16.6912C12.1808 16.6912 12.2082 16.6887 12.2347 16.6835C12.4769 16.6363 12.6367 16.3959 12.5909 16.1473C12.4456 15.3549 12.0857 14.6238 11.5499 14.0327ZM10.0718 10.6968C10.0718 9.77857 9.35281 9.03155 8.46903 9.03155V9.03153C7.58488 9.03153 6.8656 9.77855 6.86558 10.6968C6.86558 11.6148 7.5849 12.3619 8.46903 12.3619C9.35281 12.3619 10.0718 11.6148 10.0718 10.6968Z"
                fill="#C700E4"
              />
            </svg>
            身份验证
          </div>
          <div class="right c_des">
            <router-link
              to="/mthrough"
              class="c_pass"
              v-if="details.kycUpgradeStatus == 2"
              >已验证</router-link
            >
            <router-link to="/mthrough" class="c_error" v-else
              >去验证</router-link
            >
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.09525L1.04494 0L6 5.19362L1.04494 10.3872L0 9.29199L3.90952 5.19334L0 1.09525Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>
        </li>
      </ul>
      <h3 class="title">安全设置</h3>
      <ul>
        <li>
          <div class="left v_c">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.6992 3.16295C16.8782 3.45276 17.9492 4.05106 18.8132 4.91112C21.5042 7.57545 21.6032 12.016 19.0382 14.8112C17.7602 16.2041 16.0232 16.9707 14.1692 16.9707C13.2062 16.9707 12.2432 16.7557 11.3702 16.3443L9.47119 18.401C9.9572 19.018 9.9392 19.9342 9.39919 20.5231C9.11119 20.841 8.71519 21.0186 8.29219 21.0186C7.95019 21.0186 7.62619 20.9064 7.35619 20.6914L6.24919 21.7571L6.19519 21.7665C6.19187 21.7665 6.18026 21.7681 6.16133 21.7707C6.07774 21.7821 5.85138 21.8132 5.56519 21.8132C5.06119 21.8132 4.38619 21.7291 3.96319 21.3084C3.3061 20.6525 3.15068 19.0216 3.12866 18.7905C3.12746 18.7779 3.12665 18.7695 3.12619 18.7656L3.11719 18.6815L8.18419 13.1658C6.87919 10.5109 7.32019 7.29499 9.30919 5.13549C10.0652 4.32217 10.9742 3.71451 12.0092 3.34992L12.2342 3.26579L12.2612 4.64002L12.1442 4.68676C11.4062 4.99526 10.7492 5.45334 10.2092 6.04229C8.63419 7.75307 8.23819 10.2398 9.21019 12.3899L9.7502 13.3435L4.62019 18.9245C4.62919 19.3172 4.71919 19.9342 4.91719 20.1305C5.03419 20.2427 5.34019 20.3081 5.74519 20.3081C5.80846 20.3081 5.86554 20.3049 5.91284 20.3022C5.94628 20.3004 5.97482 20.2988 5.99719 20.2988L7.32019 18.8591L8.10319 19.635C8.15719 19.6911 8.22019 19.7191 8.29219 19.7191C8.36419 19.7191 8.43619 19.6818 8.49019 19.6257C8.59819 19.5135 8.58919 19.3359 8.48119 19.2237L7.69819 18.4478L11.1452 14.6897L12.0632 15.2412C12.7292 15.5217 13.4312 15.6712 14.1602 15.6712C15.6722 15.6712 17.0762 15.0449 18.1202 13.9137C19.1282 12.8106 19.6682 11.3709 19.6322 9.84713C19.6052 8.33267 19.0022 6.9117 17.9402 5.86467C17.2922 5.21962 16.5002 4.7522 15.6362 4.49979L15.5102 4.46239L15.4832 3.11621L15.6992 3.16295ZM11.0462 10.0528C11.0642 10.9222 11.4062 11.7262 12.0092 12.3245C12.5942 12.9041 13.3592 13.2219 14.1602 13.2219C15.0242 13.2219 15.8252 12.8667 16.4192 12.2217C16.9952 11.5953 17.3012 10.7726 17.2832 9.91258C17.2652 9.04317 16.9232 8.2392 16.3202 7.64089C15.7352 7.06128 14.9702 6.74343 14.1692 6.74343C13.3052 6.74343 12.5042 7.09868 11.9102 7.74372C11.3342 8.37007 11.0282 9.18339 11.0462 10.0528ZM15.4472 8.57574C15.8072 8.93098 16.0142 9.4171 16.0232 9.93127C16.0322 10.4454 15.8522 10.9409 15.5102 11.3148C15.1592 11.6981 14.6822 11.9132 14.1602 11.9132C13.6832 11.9132 13.2242 11.7262 12.8732 11.3803C12.5132 11.025 12.3062 10.5389 12.2972 10.0248C12.2882 9.51059 12.4682 9.01512 12.8102 8.64118C13.1612 8.25789 13.6472 8.04288 14.1602 8.04288C14.6462 8.04288 15.0962 8.22985 15.4472 8.57574Z"
                fill="#0CB397"
              />
            </svg>
            登录密码
          </div>
          <router-link to="/mChangePwd" class="right c_des">
            <span class="c_des">修改</span>
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.09525L1.04494 0L6 5.1936L1.04494 10.3872L0 9.29196L3.90952 5.19333L0 1.09525Z"
                fill="#D5D5ED"
              />
            </svg>
          </router-link>
        </li>
        <li>
          <div class="left v_c">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.25623 8.86386H6.01484L6.01485 8.86386C5.98049 8.86386 5.94635 8.84829 5.92067 8.82161C5.89714 8.79494 5.88215 8.75939 5.8843 8.72381C5.93779 7.221 6.5906 5.68477 7.67574 4.5087C8.24507 3.89065 8.9 3.40154 9.62131 3.05694C10.3833 2.69233 11.1837 2.50781 11.9992 2.50781C12.8146 2.50781 13.6152 2.69233 14.3771 3.05694C15.0984 3.40154 15.7535 3.89065 16.3227 4.5087C17.4057 5.68477 18.0585 7.22101 18.1143 8.72381C18.1164 8.75948 18.1014 8.79727 18.0779 8.82161C18.0542 8.84829 18.0201 8.86386 17.9837 8.86386H16.7421V8.86375C16.6715 8.86375 16.6158 8.80595 16.6115 8.73481C16.5152 6.07363 14.5333 4.06608 11.9991 4.06608C9.46495 4.06608 7.48301 6.07375 7.38669 8.73493C7.38443 8.80828 7.32676 8.86386 7.25623 8.86386ZM14.7815 15.7647C14.7815 15.9935 14.6039 16.1782 14.3813 16.1782H12.3994V17.3099H14.3792C14.5996 17.3099 14.7793 17.4966 14.7793 17.7254C14.7793 17.9544 14.6017 18.1391 14.3792 18.1391H12.3994V19.4108C12.3994 19.6398 12.2196 19.8243 11.9991 19.8243C11.7788 19.8243 11.599 19.6398 11.599 19.4108V18.1391H9.61909C9.39853 18.1391 9.21885 17.9546 9.21885 17.7254C9.21885 17.4964 9.39649 17.3099 9.61909 17.3099H11.5988V16.1782H9.61909C9.39853 16.1782 9.21885 15.9937 9.21885 15.7647C9.21885 15.5357 9.39649 15.349 9.61909 15.349H11.4618L9.35786 13.4704C9.19306 13.3214 9.17377 13.0613 9.31718 12.8879C9.46068 12.7167 9.71311 12.6967 9.88018 12.8456L12.0011 14.7376L14.1202 12.8456C14.287 12.6967 14.5375 12.7145 14.6831 12.8879C14.8286 13.0613 14.8094 13.3214 14.6424 13.4704L12.5385 15.349H14.3813C14.6017 15.349 14.7815 15.5357 14.7815 15.7647ZM17.4398 10.1511H6.5605C5.32991 10.1511 4.32812 11.1916 4.32812 12.4699V20.1044C4.32812 21.3806 5.3299 22.421 6.5605 22.421H17.4419C18.6705 22.421 19.6721 21.3805 19.6721 20.1022V12.4699C19.6722 11.1916 18.6704 10.1511 17.4398 10.1511ZM17.4419 21.1738C18.0091 21.1738 18.4714 20.6936 18.4714 20.1044V12.4699C18.4714 11.8808 18.0091 11.4005 17.4419 11.4005H6.56051C5.99331 11.4005 5.5309 11.8808 5.5309 12.4699V20.1044C5.5309 20.6936 5.99331 21.1738 6.56051 21.1738H17.4419Z"
                fill="#FD7400"
              />
            </svg>
            支付密码
          </div>
          <div class="right">
            <span
              class="c_error"
              @click="setTradePwd(1)"
              v-if="details.tradePwdSet == 0"
              >未设置</span
            >
            <span
              class="c_des"
              @click="setTradePwd(2)"
              v-if="details.tradePwdSet == 1"
              >修改</span
            >
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.09525L1.04494 0L6 5.19361L1.04494 10.3872L0 9.29197L3.90952 5.19333L0 1.09525Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>
        </li>
        <li @click="service">
          <div class="left v_c">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.8947 19.7586C17.6234 18.5799 19.4588 15.8241 19.4588 12.7083C19.4588 8.48481 16.1171 5.05884 11.9923 5.05884C7.86738 5.05884 4.52578 8.48472 4.52578 12.7083C4.52578 13.6516 4.69219 14.5706 5.01295 15.4324C5.09255 15.6462 4.99017 15.8866 4.78428 15.9693C4.57839 16.052 4.34696 15.9456 4.26736 15.7318C4.25034 15.6861 4.23372 15.6402 4.21749 15.5942C4.18715 15.5955 4.15665 15.5962 4.126 15.5962C2.95181 15.5962 2 14.6204 2 13.4166C2 12.3097 2.80477 11.3955 3.8472 11.2555C4.51887 7.26356 7.91081 4.22852 11.9923 4.22852C16.0736 4.22852 19.4657 7.26361 20.1374 11.2556C21.1797 11.3956 21.9844 12.3097 21.9844 13.4166C21.9844 14.6204 21.0326 15.5962 19.8584 15.5962C19.8274 15.5962 19.7966 15.5955 19.7659 15.5942C18.9866 17.8028 17.3341 19.6101 15.1841 20.5328C15.165 21.1027 14.7085 21.5586 14.148 21.5586C13.5755 21.5586 13.1113 21.0828 13.1113 20.4958C13.1113 19.9088 13.5755 19.433 14.148 19.433C14.4413 19.433 14.7062 19.5578 14.8947 19.7586L14.8947 19.7586ZM11.9922 5.91767C8.33829 5.91767 5.37397 8.95675 5.37397 12.7082C5.37397 16.4597 8.33829 19.4987 11.9922 19.4987C15.6461 19.4987 18.6104 16.4597 18.6104 12.7082C18.6104 8.95675 15.6461 5.91767 11.9922 5.91767ZM11.9922 6.748C15.207 6.748 17.8111 9.41777 17.8111 12.7082C17.8111 15.9986 15.207 18.6684 11.9922 18.6684C8.77745 18.6684 6.17335 15.9986 6.17335 12.7082C6.17335 9.41777 8.77745 6.748 11.9922 6.748ZM9.39437 14.0834C10.1553 14.3848 11.0262 14.566 11.9923 14.566H11.9923C12.9584 14.566 13.8292 14.3848 14.5901 14.0834C14.8544 13.9788 15.0853 13.8671 15.2808 13.7564C15.3943 13.692 15.4684 13.6442 15.501 13.6206C15.8164 13.3929 16.2294 13.7133 16.1086 14.0921C15.5299 15.9061 13.8783 17.1557 11.9923 17.1557C10.1062 17.1557 8.45441 15.906 7.87579 14.0921C7.75498 13.7133 8.16789 13.3929 8.48331 13.6206C8.51593 13.6441 8.59005 13.692 8.70359 13.7564C8.89911 13.8671 9.13006 13.9787 9.39437 14.0834Z"
                fill="#FF5950"
              />
            </svg>
            咨询客服
          </div>
          <div class="right" >
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.09525L1.04494 0L6 5.19361L1.04494 10.3872L0 9.29197L3.90952 5.19333L0 1.09525Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <!-- 弹窗层 -->
    <div v-show="updateImage">
      <div class="mask"></div>
      <div class="toast-wrapper-bottom h_c">
        <div class="toast">
          <ul>
            <li class="h_c v_c f16" @click="updateImg">上传图片</li>
            <input
              ref="file"
              style="display:none"
              type="file"
              accept="image/*"
              @change="frontPhotochange"
            />
            <li class="h_c v_c c_des f16" @click="updateImage = false">取消</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 修改昵称 -->
    <div v-show="updateUname">
      <div class="mask"></div>
      <div class="toast-wrapper-bottom1 h_c">
        <div class="toast">
          <div class="updateTitle">
            <h3 class="f16">修改昵称</h3>
            <svg
              @click="updateUname = false"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7803 0.21967C11.4874 -0.0732233 11.0126 -0.0732233 10.7197 0.21967L6 4.93934L1.28033 0.21967L1.20967 0.157278C0.915456 -0.0714902 0.490033 -0.0506931 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L4.93934 6L0.21967 10.7197L0.157278 10.7903C-0.0714902 11.0845 -0.0506931 11.51 0.21967 11.7803C0.512563 12.0732 0.987437 12.0732 1.28033 11.7803L6 7.06066L10.7197 11.7803L10.7903 11.8427C11.0845 12.0715 11.51 12.0507 11.7803 11.7803C12.0732 11.4874 12.0732 11.0126 11.7803 10.7197L7.06066 6L11.7803 1.28033L11.8427 1.20967C12.0715 0.915456 12.0507 0.490033 11.7803 0.21967Z"
                fill="#D5D5ED"
              />
            </svg>
          </div>

          <div class="input-wrapper">
            <input v-model="newNickName" type="text" />
          </div>
          <button
            class="sumbit"
            :class="{ sub: newNickName !== '' }"
            @click="sumbit"
          >
            提交
          </button>
        </div>
      </div>
    </div>
    <noKyc ref="noKyc" @goSet="goSet"> </noKyc>
    
  </div>
</template>
<script>
import { customerService } from "@/utils/index";
import userInfoApi from "@/api/userInfo";
import buyApi from "@/api/buy";
import noKyc from "@/components/noKyc";
export default {
  data() {
    return {
      newNickName: "",
      details: {},
      updateImage: false, //上传图片弹框
      updateUname: false //昵称
    };
  },
  components: {
    noKyc,
  },
  created() {
    this.getUserInfoDetails();
  },
  methods: {
    // 客服跳转
    service() {
      customerService();
    },
    gomMethodOfCollection(){
      if (this.details.kycStatus != 2) {
        this.$refs.noKyc.show(1);
        return;
      }
      this.$router.push('/mmethodOfCollection')
    },
    frontPhotochange(e) {
      buyApi
        .uploadphoto({
          file: e.target.files[0]
        })
        .then(res => {
          if (res.data.data) {
            userInfoApi
              .simple({
                avatarUrl: res.data.data
              })
              .then(res => {
                console.log(res);
                this.getUserInfoDetails();
                this.updateImage = false;
              });
          }
        });
    },
    updateImg() {
      this.$refs.file.click();
    },
    goSet() {
      this.$router.push("/mthrough");
    },
    //获取用户详细信息
    getUserInfoDetails() {
      userInfoApi
        .getUserInfoDetails({})
        .then(res => {
          console.log(res);
          this.details = res.data.data;
          this.newNickName = res.data.data.nickname;
          localStorage.setItem(
            "userInfoDetails",
            JSON.stringify(res.data.data)
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    //设置修改交易密码
    setTradePwd(value) {
      if (this.details.kycStatus != 2) {
        this.$refs.noKyc.show(2);
        return;
      }
      this.$router.push({
        path: "/mChangeTransaPwd",
        query: {
          type: value
        }
      });
    },
    // 修改昵称提交
    sumbit() {
      userInfoApi
        .simple({
          nickname: this.newNickName
        })
        .then(res => {
          this.getUserInfoDetails();
          this.updateUname = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
//  描述文本 浅色
.c_des {
  color: #a0a0b3;
}
// 通过 绿色
.c_pass {
  color: #00cf00;
}

// 错误 红色
.c_error {
  color: #f0446b;
}

// 子元素垂直方向居中
.v_c {
  display: flex;
  align-items: center;
}

// 子元素水平方向居中
.h_c {
  display: flex;
  justify-content: center;
}

.f16 {
  font-size: 0.32rem;
}

.container {
  .top-banner {
    width: 100%;
    height: 3.16rem;
    background-image: url("../../../assets/transactions/img_bg_user.png");
    background-size: 100%;
    position: relative;

    .head_img {
      position: absolute;
      bottom: 0.6rem;
      left: 0.38rem;
      width: 1.04rem;
      height: 1.04rem;
      border-radius: 50%;
    }
    .xj {
      position: absolute;
      bottom: 0.6rem;
      left: 0.98rem;
      display: flex;
      img {
        width: 0.44rem;
        height: 0.44rem;
      }
    }
    .nickname {
      color: #fff;
      position: absolute;
      bottom: 1.02rem;
      left: 1.82rem;
      font-weight: 500;
      font-size: 0.4rem;
      line-height: 0.56rem;
    }
    .uid {
      position: absolute;
      left: 1.82rem;
      bottom: 0.64rem;
      font-size: 0.26rem;
      line-height: 0.3rem;
      color: #ffffff;
    }
  }

  .content {
    padding: 0 0.32rem;
    .title {
      width: 100%;
      height: 1.2rem;
      color: #40405e;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 500;
      font-size: 0.36rem;
      line-height: 1.68rem;
    }
    ul > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.28rem;
      border-bottom: 1px solid #e8e8f0;
      font-size: 0.28rem;
      .left > svg {
        margin-right: 0.24rem;
      }

      .right > svg {
        margin-left: 0.24rem;
      }
    }
  }
  .mask {
    width: 100%;
    position: fixed;
    height: 100%;
    bottom: 0;
    background-color: #000;
    opacity: 0.4;
    z-index: 1;
  }

  .input-wrapper {
    width: 100%;
    height: 0.96rem;
    font-size: 0.3rem;
    color: #40405e;
    padding: 0.26rem 0.32rem;
    background: #f7f7fa;
    border-radius: 0.12rem;
    margin-top: 0.32rem;
    input {
      width: 100%;
      background: #f7f7fa;
    }
  }

  .sumbit {
    width: 100%;
    height: 0.96rem;
    background: linear-gradient(0deg, #dddde6, #dddde6);
    border-radius: 0.48rem;
    margin-top: 0.56rem;
    font-size: 0.32rem;
    color: white;
  }
  .sub {
    background: @cl-m;
  }

  .toast-wrapper-bottom {
    z-index: 2;
    position: fixed;
    width: 100%;
    bottom: 1.04rem;
    .toast {
      background-color: #fff;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.2rem;
      ul {
        li {
          height: 1.04rem;
        }
        li:first-child {
          border-bottom: 1px solid #f5f5fa;
        }
      }
    }
  }
  .toast-wrapper-bottom1 {
    z-index: 2;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .toast {
      background: #ffffff;
      width: 6.86rem;
      padding: 0.32rem;
      border-radius: 0.12rem;
      .updateTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.24rem;
      }
    }
  }
}
</style>