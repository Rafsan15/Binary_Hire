$ServerInstance = "(local)"
$UserName = "sa"
$UserPassword = "orion123@"
$DeploymentVersion = "1.0"
$DatabaseName = "BHDB";

$OS = [System.Environment]::OSVersion.Platform;
$iswindows = $true; 
if($OS -ne "Win32NT")
{
    $iswindows = $false;
}
<#
if($database_user_name)
{
        $auth=@{UserName=$UserName;Password=$UserPassword}
        Write-Host "SQL Authenticated"
}
else
{
    $auth=@{}
    Write-Host "Windows Authenticated"
}
#>

# create database if it does not exist
Try
{
    $Query = "IF NOT EXISTS (SELECT
			*
		FROM sys.databases
		WHERE name = '$DatabaseName')
BEGIN
	CREATE DATABASE $DatabaseName
END
GO"
    if($iswindows)
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database master -QueryTimeout 65535 -Query $Query 
    }
    else
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database master -QueryTimeout 65535 -TrustServerCertificate -Query $Query 
    }
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database "master" -QueryTimeout 65535 -Query $Query -Encrypt "Optional"
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Database "master" -QueryTimeout 65535 -Query $Query -Verbose @Auth
    Write-Host "Database $DatabaseName will be crerated if it does not exist.";
}
Catch
{
    Write-Host -ForegroundColor Red 'Error occured while executing query'
    Write-Host -ForegroundColor Red $_.Exception.Message
}



$ScriptsRoot = "$PSScriptRoot";
$ExecutionOrderList = $ScriptsRoot + '\execute-order-list-' + $DeploymentVersion + '.txt';
$ExecutionOrderListPath = Resolve-Path $ExecutionOrderList
$ExecutionOrderListLines = Get-Content $ExecutionOrderListPath

Foreach ($Line in $ExecutionOrderListLines)
{
    if($Line.Trim().StartsWith('#') -or $Line.Trim() -eq '')
    {
        continue;
    }
    $FilePath = Resolve-Path $ScriptsRoot\$Line
    Write-Host 'Executing: ' $FilePath.ToString();
    Try
    {
        if($iswindows)
        {
            Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -InputFile $FilePath.ToString()
        }
        else 
        {
            Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -TrustServerCertificate -QueryTimeout 65535 -InputFile $FilePath.ToString()
        }
        #Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -InputFile $FilePath.ToString() -Encrypt "Optional"
        #Invoke-Sqlcmd -ServerInstance $ServerInstance -Database $DatabaseName -QueryTimeout 65535 -InputFile $FilePath.ToString() -Verbose @Auth
	    Write-Host 'Execution complete'
    }
    Catch
    {
        Write-Host -ForegroundColor Red 'Error occured while executing script : ' + $FilePath.ToString()
        Write-Host -ForegroundColor Red $_.Exception.Message
    }
}


# update deployment history table
Try
{
    $Query = "
    IF OBJECT_ID(N'[dbo].[DBDeploymentHistory]', N'U') IS NULL
    BEGIN
        CREATE TABLE [dbo].[DBDeploymentHistory]
        (
	        [IID] INT IDENTITY (1,1) PRIMARY KEY,
	        [Version] VARCHAR(32) NOT NULL,
	        [DeployFileName] VARCHAR(4096) NOT NULL,
            [HostName] VARCHAR(1024) NULL,
	        [CreatedDate] DATETIME NOT NULL DEFAULT (GETDATE()),
	        [CreatedBy] VARCHAR(50) NOT NULL
        )
    END;"
    
    if($iswindows)
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -Query $Query
    }
    else 
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -TrustServerCertificate -QueryTimeout 65535 -Query $Query
    }
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -Query $Query -Encrypt "Optional"
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Database $DatabaseName -QueryTimeout 65535 -Query $Query -Verbose @Auth
    Write-Host 'Deployment History table will be created if it does not exist'

    $Query = "
    IF OBJECT_ID(N'[dbo].[DBDeploymentHistory]', N'U') IS NOT NULL
    BEGIN
        INSERT INTO [dbo].[DBDeploymentHistory]
           ([Version]
           ,[DeployFileName]
           ,[HostName]
           ,[CreatedDate]
           ,[CreatedBy])
     VALUES
           ('$DeploymentVersion'
           ,'$PSCommandPath'
           ,'$env:COMPUTERNAME'
           ,GETDATE()
           ,'$UserName')
    END;"
    
    if($iswindows)
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -Query $Query
    }
    else 
    {
        Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -TrustServerCertificate -QueryTimeout 65535 -Query $Query
    }
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Username $UserName -Password $UserPassword -Database $DatabaseName -QueryTimeout 65535 -Query $Query -Encrypt "Optional"
    #Invoke-Sqlcmd -ServerInstance $ServerInstance -Database $DatabaseName -QueryTimeout 65535 -Query $Query -Verbose @Auth
    Write-Host 'Deployment history updated'
}
Catch
{
    Write-Host -ForegroundColor Red 'Error occured while updating deployment history.'
    Write-Host -ForegroundColor Red $_.Exception.Message
}
