
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskServiceService } from '../../Services/task.service';

import { Project } from '../../models/project';
import {Projectsummary } from '../../models/projectsummary';
import { User } from '../../models/user';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  item:Task;
  proj: Project;
  _users: User[];
  _projects: Project[];
  message : any;
 _tasks : Task[];
 public title: string = "Add";

  constructor(private _taskService : TaskServiceService) {
    this.item = new Task();
  
  
    this.GetParentTaskList();
  }

  ngOnInit() {

    $(document).ready(function () {
      $("#userInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#userTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {
      $("#projectInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#projectTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {
      $("#taskInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#taskTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {
      //Start Date
      var date = new Date();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var year = date.getFullYear();
      var mm1;
      var dd1;
  
      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
  
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
  
      var startDate = year + "-" + mm1 + "-" + dd1;
      $("#txtStartDate").val(startDate);
  
      //End date
      var newdate = new Date();
      newdate.setDate(date.getDate() + 1);
  
      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;
  
      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
  
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
  
      var endDate = year + "-" + mm1 + "-" + dd1;
      $("#txtEndDate").val(endDate);
      this.item.EndDate = endDate;
      this.item.StartDate = startDate;
  console.log(startDate+'manoj');
    });
  
    $(document).ready(function () {
      $('#btnAdd').click(function () {
        
        //Start Date
      var date = new Date();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var year = date.getFullYear();
      var mm1;
      var dd1;
  
      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
  
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
  
      var startDate = year + "-" + mm1 + "-" + dd1;
      $("#txtStartDate").val(startDate);
  
      //End date
      var newdate = new Date();
      newdate.setDate(date.getDate() + 1);
  
      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;
  
      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
  
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
  
      var endDate = year + "-" + mm1 + "-" + dd1;
      $("#txtEndDate").val(endDate);
      this.item.EndDate = endDate;
      this.item.StartDate = startDate;

        if ($('#txtEndDate').val() < $('#txtStartDate').val()) {
          alert('Start Date should be less than End Date');
          return;
        }
      });
    });
  
    $(document).ready(function () {

      $('#btnAdd').click(function () {

        //Required validation for all the mandatory fields

        if ($('#txtProject').val() == "") {
          alert('Project is required');
          return;
        }
        else if ($('#txtTask').val() == "") {
          alert('Task is required');
          return;
        }
        else if ($('#txtParentTask').val() == "") {
          alert('Parent Task is required');
          return;
        }
        else if ($('#txtStartDate').val() == "") {
          alert('Start Date is required');
          return;
        }
        else if ($('#txtEndDate').val() == "") {
          alert('End Date is required');
          return;
        }
        else if ($('#txtUser').val() == "") {
          alert('User is required');
          return;
        }

        //Start date and End date validations
        if ($('#txtEndDate').val() <= $('#txtStartDate').val()) {
          alert('Start Date should be less than End Date');
          return;
        }
      });
    });
  

    $(document).ready(function(){
      
      $('#btnAdd').click(function() {
       
        if($("#addForm").valid())
        {
          return true;
        }
        else
        {
          return false;
        }  
      });
      
      });

  }
  

  GetParentTaskList()
  {
    this._taskService.GetAllTasks()
    .subscribe((data : Task[]) => { this._tasks = data });
    console.log("Get Parent task end");
  }

  GetAllProjects() {
    this._taskService.GetAllProjects().subscribe((data: Project[]) => { this._projects = data });
  }

  GetAllUsers() {
    this._taskService.GetAllUsers().subscribe((data: User[]) => { this._users = data });
  }

  GetNames(items: any) {
    console.log(items.FirstName);
    console.log(items.UserId);
    this.item.UserName = items.FirstName;
    this.item.UserId = items.UserId;
    console.log(this.item.UserName);
    console.log(this.item.UserId);
  }

  GetProjects(items: any) {
    console.log(items.ProjectName);
    console.log(items.UserId);
    this.item.ProjectName = items.ProjectName;
    this.item.ProjectId = items.ProjectId;
    console.log(this.item.ProjectName);
    console.log(this.item.UserId);
  }

  GetTasks(items: any) {
    console.log(items.TaskName);
    this.item.ParentTask = items.TaskName;
    console.log(this.item.TaskName);
  }

  Insert(item: Task) {
    this.item.Status = 'Not Completed';
    if (item.ProjectName != "") {
      if (this.title == "Add") {
        console.log('INSERT IN');
        this._taskService.InsertData(item).subscribe((data) => { this.ngOnInit(), alert(data) });
      }
      else {
        this._taskService.UpdateData(item).subscribe((data) => { this.ngOnInit(), alert(data) });
      }
    }
  }

  //Reset the some default value

  Reset() {
    this.title = "Add";
  }

  Update(item: any) {

    this._taskService.GetTask(item.TaskId)
        .subscribe((data: Task) => { this.item = data });
    this.title = "Update";
  }

}
