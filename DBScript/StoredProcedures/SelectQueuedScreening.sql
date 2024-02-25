--region PROCEDURE [dbo].[SelectQueuedScreening]
IF OBJECT_ID('[dbo].[SelectQueuedScreening]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectQueuedScreening] 
    END 
GO 
     
CREATE PROC [dbo].[SelectQueuedScreening] 
AS
	SELECT TOP(1)
	Scr.Id,
	Scr.JobPostId,
	Scr.WorkflowMasterId,
	Scr.LocationPath,
	Scr.Status,
	Scr.UserId
	FROM [dbo].[Screening] AS Scr
	WHERE Scr.Status=18
GO
--endregion