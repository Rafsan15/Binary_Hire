
--region PROCEDURE [dbo].[SaveSchedule]
IF OBJECT_ID('[dbo].[SaveSchedule]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveSchedule] 
    END 
GO 
     
CREATE PROC [dbo].[SaveSchedule] 
( 
	@Id BIGINT, 
	@JobPostId INT, 
	@ResultId INT, 
	@OrganizationId INT, 
	@OnDate DATE, 
	@StartTime DATETIME, 
	@EndTime DATETIME, 
	@ModifiedBy INT 
)
AS
DECLARE @LocalId BIGINT = @Id;
DECLARE @LocalJobPostId INT = @JobPostId;
DECLARE @LocalResultId INT = @ResultId;
DECLARE @LocalOrganizationId INT = @OrganizationId;
DECLARE @LocalOnDate DATE = @OnDate;
DECLARE @LocalStartTime DATETIME = @StartTime;
DECLARE @LocalEndTime DATETIME = @EndTime;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

IF @LocalId IS NULL OR @LocalId = 0 OR (NOT EXISTS (SELECT * FROM dbo.[Schedule] WHERE Id = @LocalId))
BEGIN
	INSERT INTO [dbo].[Schedule]
	([JobPostId], [ResultId], [OrganizationId], [OnDate], [StartTime], [EndTime], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	SELECT @LocalJobPostId, @LocalResultId, @LocalOrganizationId, @LocalOnDate, @LocalStartTime, @LocalEndTime, @LocalModifiedBy, GETDATE(), NULL, NULL
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[Schedule]
	SET
		[JobPostId] = @LocalJobPostId, [ResultId] = @LocalResultId, [OrganizationId] = @LocalOrganizationId, [OnDate] = @LocalOnDate, [StartTime] = @LocalStartTime, [EndTime] = @LocalEndTime, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

