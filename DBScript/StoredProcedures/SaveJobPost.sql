
--region PROCEDURE [dbo].[SaveJobPost]
IF OBJECT_ID('[dbo].[SaveJobPost]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SaveJobPost] 
    END 
GO 
     
CREATE PROC [dbo].[SaveJobPost] 
( 
	@Id INT, 
	@Title NVARCHAR (100), 
	@Description NVARCHAR(MAX), 
	@JobType INT, 
	@MinExperience INT, 
	@MaxExperience INT, 
	@Location NVARCHAR (100), 
	@Education NVARCHAR (100), 
	@Skills NVARCHAR (100), 
	@WorkPlace INT, 
	@IsFav BIT, 
	@IsDeleted BIT, 
	@Status INT, 
	@OrganizationId INT, 
	@ModifiedBy INT 
)
AS
DECLARE @LocalId INT = @Id;
DECLARE @LocalTitle NVARCHAR (100) = LTRIM(RTRIM(@Title));
DECLARE @LocalDescription NVARCHAR(MAX) = LTRIM(RTRIM(@Description));
DECLARE @LocalJobType INT = @JobType;
DECLARE @LocalMinExperience INT = @MinExperience;
DECLARE @LocalMaxExperience INT = @MaxExperience;
DECLARE @LocalLocation NVARCHAR (100) = LTRIM(RTRIM(@Location));
DECLARE @LocalEducation NVARCHAR (100) = LTRIM(RTRIM(@Education));
DECLARE @LocalSkills NVARCHAR (100) = LTRIM(RTRIM(@Skills));
DECLARE @LocalWorkPlace INT = @WorkPlace;
DECLARE @LocalIsFav BIT = @IsFav;
DECLARE @LocalIsDeleted BIT = @IsDeleted;
DECLARE @LocalStatus INT = @Status;
DECLARE @LocalOrganizationId INT = @OrganizationId;
DECLARE @LocalModifiedBy INT = @ModifiedBy;

IF @LocalId IS NULL OR @LocalId = 0
BEGIN
	INSERT INTO [dbo].[JobPost]
	([Title], [Description], [JobType], [MinExperience], [MaxExperience], [Location], [Education], [Skills], [WorkPlace], [IsFav], [IsDeleted], [Status], [OrganizationId], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate])
	SELECT @LocalTitle, @LocalDescription, @LocalJobType, @LocalMinExperience, @LocalMaxExperience, @LocalLocation, @LocalEducation, @LocalSkills, @LocalWorkPlace, @LocalIsFav, @LocalIsDeleted, @LocalStatus, @LocalOrganizationId, @LocalModifiedBy, GETDATE(), NULL, NULL
	SET @LocalId = SCOPE_IDENTITY()
END
ELSE
BEGIN
	UPDATE [dbo].[JobPost]
	SET
		[Title] = @LocalTitle, [Description] = @LocalDescription, [JobType] = @LocalJobType, [MinExperience] = @LocalMinExperience, [MaxExperience] = @LocalMaxExperience, [Location] = @LocalLocation, [Education] = @LocalEducation, [Skills] = @LocalSkills, [WorkPlace] = @LocalWorkPlace, [IsFav] = @LocalIsFav, [IsDeleted] = @LocalIsDeleted, [Status] = @LocalStatus, [OrganizationId] = @LocalOrganizationId, [ModifiedBy] = @LocalModifiedBy, [ModifiedDate] = GETDATE()
		WHERE [Id] = @LocalId
END
SELECT @LocalId
GO
--endregion

