<template>
  <div class="right">
    <!------- MESSAGES ------->
    <div class="messages">
      <div class="heading">
        <h4>Suggested Users</h4>
        <!-- <i class="uil uil-edit"></i> -->
      </div>
      <!------- SEARCH BAR ------->
      <!-- <div class="search-bar">
        <i class="uil uil-search"></i>
        <input type="search" placeholder="Search messages" id="message-search" />
      </div> -->
      <!------- MESSAGES CATEGORY ------->
      <!-- <div class="category">
        <h6 class="active">Primary</h6>
        <h6>General</h6>
        <h6 class="message-requests">Requests (7)</h6>
      </div> -->
      <!------- MESSAGES ------->
      <div class="message">
        <div class="profile-photo">
          <img src="../assets/images/profile-17.jpg" />
        </div>
        <div class="message-body">
          <h5>Edem Quist</h5>
          <p class="text-muted">user@gmail.com</p>
        </div>
      </div>
      <!------- MESSAGES ------->
    </div>
    <!------- END OF MESSAGES ------->

    <!------- FRIEND REQUEST ------->
    <!-- <div class="friend-requests">
      <h4>Requests</h4>
      <div class="request">
        <div class="info">
          <div class="profile-photo">
            <img src="./images/profile-20.jpg" />
          </div>
          <div>
            <h5>Hajia Bintu</h5>
            <p class="text-muted">8 mutual friends</p>
          </div>
        </div>
        <div class="action">
          <button class="btn btn-primary">Accept</button>
          <button class="btn">Decline</button>
        </div>
      </div>
      <div class="request">
        <div class="info">
          <div class="profile-photo">
            <img src="./images/profile-18.jpg" />
          </div>
          <div>
            <h5>Edelson Mandela</h5>
            <p class="text-muted">2 mutual friends</p>
          </div>
        </div>
        <div class="action">
          <button class="btn btn-primary">Accept</button>
          <button class="btn">Decline</button>
        </div>
      </div>
      <div class="request">
        <div class="info">
          <div class="profile-photo">
            <img src="./images/profile-17.jpg" />
          </div>
          <div>
            <h5>Megan Baldwin</h5>
            <p class="text-muted">5 mutual friends</p>
          </div>
        </div>
        <div class="action">
          <button class="btn btn-primary">Accept</button>
          <button class="btn">Decline</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestedUsers: [
        {
          id: 1,
          name: "User One",
          handle: "@userone",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "User Two",
          handle: "@usertwo",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "User Three",
          handle: "@userthree",
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Optional: Additional styles */
</style>
