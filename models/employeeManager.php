<?php

function addEmployee(array $newEmployee)
{
    $users = json_decode(file_get_contents(RESOURCES . 'employees.json'));
    array_push($users, $newEmployee);
    file_put_contents(RESOURCES . 'employees.json', json_encode($users));
}


function deleteEmployee(string $id)
{

    $now = (new \DateTime())->format('U');

    $timeDifference = $now - $_SESSION["startTime"];

    if ($timeDifference > 500) {
        echo "expired";
    } else {
        $employees = json_decode(file_get_contents(RESOURCES . 'employees.json'));

        foreach ($employees as $employee) {

            if ($employee->id == $id) {
                $index = array_search($employee, $employees);
                array_splice($employees, $index, 1);
                file_put_contents(RESOURCES . 'employees.json', json_encode($employees));
                echo "deleted";
            }
        }
    }
}


function updateEmployee(array $updateEmployee)
{
    $employees = json_decode(file_get_contents(RESOURCES . 'employees.json'));

    foreach ($employees as $employee) {
        if ($employee->id == $updateEmployee['id']) {

            $key = array_search($employee, $employees);

            $object = json_decode(json_encode($updateEmployee), FALSE);

            $employees[$key] = $object;

            file_put_contents(RESOURCES . 'employees.json', json_encode($employees));
        }
    }
}


function getEmployee(string $id)
{
    $requiredEmployee = null;

    $employees = json_decode(file_get_contents(RESOURCES . 'employees.json'));
    foreach ($employees as $employee) {
        if ($employee->id == $id) {
            $requiredEmployee = $employee;
            $_SESSION['employeeId'] = $employee->id;
            break;
        }
    }
    return $requiredEmployee;
}

function getNextIdentifier(array $employeesCollection): int
{

    $lastIndex = count($employeesCollection) - 1;
    $newId = $employeesCollection[$lastIndex]->id + 1;
    $newIdInt = (int)$newId;
    return $newIdInt;
}

//My functions 

function getEmployees()
{
    $jsonFile = file_get_contents(RESOURCES . 'employees.json');
    echo $jsonFile;
}

function showDashboard()
{
    require_once VIEWS . "dashboard/dashboard.php";
}