using Google.Apis.Auth.OAuth2;
using Google.Apis.Download;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading;
using BH.Models;
using Microsoft.Extensions.Options;

namespace BH.Services.Extensions
{
	public class ExtractFile: IExtractFile
	{
        // public string sharedFolderLink = ""; // Shared link to the folder
        public string localFolderPath = ""; // Path to local folder where files will be saved

        string[] Scopes = { DriveService.Scope.DriveReadonly };
        string ApplicationName = "Google Drive API .NET Quickstart";
        private APISettings _apiSettings;
        
        public ExtractFile(IOptions<APISettings> apiSettings)
        {
            _apiSettings = apiSettings.Value;
            localFolderPath = _apiSettings.LocalPath;
        }

        public string GetLocalFolderPath()
        {
            return localFolderPath;
        }

        public Dictionary<string, string> Extract(string sharedFolderLink)
        {
            var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());
            string jsonFile = Path.Combine(currentDirectory.FullName, "BH.Services/Extensions/credentials.json");
            var g = _apiSettings;
            try
            {
                ClearLocalFolder(localFolderPath);
                GoogleCredential credential;

                using (var stream = new FileStream(jsonFile, FileMode.Open, FileAccess.Read))
                {
                    credential = GoogleCredential.FromStream(stream)
                        .CreateScoped(Scopes);
                }

                var service = new DriveService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = ApplicationName,
                });

                // Extract folder ID from shared link
                string folderId = ExtractFolderIdFromLink(sharedFolderLink);

                // List files in the shared folder
                Dictionary<string, string> filesDictionary = ListFiles(service, folderId);
                return filesDictionary;
            }
            catch (Exception e)
            {
                var x = e.Message;
            }
            return null;
            
        }

        private string ExtractFolderIdFromLink(string sharedLink)
        {
            Uri uri = new Uri(sharedLink);
            string[] segments = uri.Segments;
            // Assuming the folder ID is the second last segment in the URL
            return segments[segments.Length - 1].TrimEnd('/');
        }

        private Dictionary<string, string> ListFiles(DriveService service, string folderId)
        {
            //var request = service.Files.List();
            //request.Q = $"'{folderId}' in parents and trashed = false";

            //do
            //{
            //    var response = request.Execute();

            //    foreach (var file in response.Files)
            //    {
            //        Console.WriteLine($"Downloading {file.Name}...");
            //        DownloadFile(service, file.Id, file.Name);
            //    }

            //    request.PageToken = response.NextPageToken;
            //} while (!string.IsNullOrEmpty(request.PageToken));

            var request = service.Files.List();
            request.Q = $"'{folderId}' in parents and trashed = false";

            Dictionary<string, string> filesDictionary = new Dictionary<string, string>();

            do
            {
                var response = request.Execute();

                foreach (var file in response.Files)
                {
                    filesDictionary[file.Name] = $"https://drive.google.com/file/d/{file.Id}/view";
                    DownloadFile(service, file.Id, file.Name);
                }

                request.PageToken = response.NextPageToken;
            } while (!string.IsNullOrEmpty(request.PageToken));

            return filesDictionary;
        }
        private void DownloadFile(DriveService service, string fileId, string fileName)
        {
            var request = service.Files.Get(fileId);
            var stream = new MemoryStream();
            request.MediaDownloader.ProgressChanged +=
                (IDownloadProgress progress) =>
                {
                    switch (progress.Status)
                    {
                        case DownloadStatus.Downloading:
                            {
                                Console.WriteLine($"Downloading {fileName}... {progress.BytesDownloaded}");
                                break;
                            }
                        case DownloadStatus.Completed:
                            {
                                Console.WriteLine($"Downloaded {fileName}");
                                break;
                            }
                        case DownloadStatus.Failed:
                            {
                                Console.WriteLine($"Download failed for {fileName}");
                                break;
                            }
                    }
                };
            request.Download(stream);
            using (var fileStream = new FileStream(Path.Combine(localFolderPath, fileName), FileMode.Create, FileAccess.Write))
            {
                stream.WriteTo(fileStream);
            }
        }
        private void ClearLocalFolder(string folderPath)
        {
            try
            {
                DirectoryInfo directory = new DirectoryInfo(folderPath);

                foreach (FileInfo file in directory.GetFiles())
                {
                    file.Delete();
                }

                foreach (DirectoryInfo subDirectory in directory.GetDirectories())
                {
                    subDirectory.Delete(true);
                }

                Console.WriteLine($"Cleared contents of {folderPath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error while clearing folder: {ex.Message}");
            }
        }
    }
}

