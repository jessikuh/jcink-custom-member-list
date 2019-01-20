'use strict';

if (window.location.href.indexOf('index.php?act=Members') > -1 || window.location.href.indexOf('index.php?&act=Members') > -1) {
  memberList();
}

function memberList() {
  const root = document.querySelector('#member-list');
  // Hide the member list table
  root.style.display = 'none';

  // Define the URL structure for a member's profile
  const memberUrl = location.protocol + '//' + location.host + '/index.php?showuser=';

  // Create a new container for the members to live in
  const memberlistElement = document.createElement('div');
  memberlistElement.className = 'member-list';
  root.parentNode.insertBefore( memberlistElement, root.nextSibling );

  const Members = [];
  function Member(name, id, level, group, joined, posts) {
    this.name = name;
    this.id = id;
    this.level = level;
    this.group = group;
    this.joined = joined;
    this.posts = posts;
  }

  const getNames = Array.prototype.slice.call(root.querySelectorAll('td.name'));
  // Retrieve all members' information
  getNames.forEach(memberInfo => {
    const name = memberInfo.textContent;
    const link = memberInfo.querySelector('a').getAttribute('href');
    const id = link.substring(link.lastIndexOf('=')).replace('=', '');
    const level = memberInfo.parentNode.querySelector('td.level').innerHTML;
    const group = memberInfo.parentNode.querySelector('td.group').textContent;
    const joined = memberInfo.parentNode.querySelector('td.joined').textContent;
    const posts = memberInfo.parentNode.querySelector('td.posts').textContent;
    Members.push(new Member(name, id, level, group, joined, posts));
  });

  // Loop through each member
  Members.forEach(member => {
    let memberObj = {
      '{{name}}': member.name,
      '{{level}}': member.level,
      '{{group}}': member.group,
      '{{joined}}': member.joined,
      '{{posts}}': member.posts
    };

    let memberReplaceValues = new RegExp(Object.keys(memberObj).join("|"),"gi");

    // Create div
    const userDiv = document.createElement('div');
  
    const groupId = member.group.toLowerCase().replace(/ /g,'-').replace(/'/g,'');
   // Append group to div to allow styling based on member's group
   userDiv.id = groupId;
    userDiv.className = 'member-container';
    // Wrap member's profile URL around all code
    userDiv.innerHTML = '<a class="member-link" href="'+ memberUrl + member.id +'">'+customMemberList.replace(memberReplaceValues, matched => { return memberObj[matched]; })+'</a>'; // replace customized vars with data
    memberlistElement.appendChild(userDiv);
  });
}