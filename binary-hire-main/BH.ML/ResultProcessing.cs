using System;
using System.Diagnostics;

namespace BH.ML
{
	public static class ResultProcessing
	{
        private static string ProcessCVMacOS(string inputData)
        {
            var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());

            // Path to your virtual environment's activation script (activate or activate.bat)
            string virtualEnvActivateScript = Path.Combine(currentDirectory.FullName, "BH.ML/b_hire/bin/activate");

            // Path to the Python executable inside the virtual environment
            string pythonExecutable = Path.Combine(currentDirectory.FullName, "BH.ML/b_hire/bin/python");

            // Path to the Python script you want to run
            string pythonScriptPath = Path.Combine(currentDirectory.FullName, "BH.ML/b_hire.py");

            // Input data to be passed to Python script
            //inputData = "/Users/akif/Downloads/CVakif.pdf";
            inputData = "\"" + inputData + "\"";

            // Set environment variables to mimic virtual environment activation
            Environment.SetEnvironmentVariable("VIRTUAL_ENV", currentDirectory.FullName); // Mimic VIRTUAL_ENV variable
            Environment.SetEnvironmentVariable("PATH", $"{currentDirectory.FullName};{Environment.GetEnvironmentVariable("PATH")}");

            var processStartInfo = new ProcessStartInfo
            {
                FileName = pythonExecutable,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                Arguments = $"{pythonScriptPath} {inputData}"
            };

            string myString = "";

            using (Process myProcess = new Process { StartInfo = processStartInfo })
            {
                myProcess.Start();

                // Pass input data to the Python script
                using (StreamWriter sw = myProcess.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine(inputData);
                    }
                }

                StreamReader myStreamReader = myProcess.StandardOutput;
                StreamReader errorReader = myProcess.StandardError;



                // Read all lines from the output
                myString = myStreamReader.ReadToEnd();
                string error = errorReader.ReadToEnd();

                myProcess.WaitForExit();
                myProcess.Close();

                //Console.WriteLine("Value received from script:\n" + myString);
            }

            // Clear the environment variables after the process is complete
            Environment.SetEnvironmentVariable("VIRTUAL_ENV", null);
            Environment.SetEnvironmentVariable("PATH", null);
            return myString;

        }
        private static string ProcessCVWindows(string Data)
        {
            var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());

            // Path to the virtual environment directory
            string virtualEnvDirectory = Path.Combine(currentDirectory.FullName, "BH.ML", "b_hire");

            // Path to the Python executable inside the virtual environment
            string pythonExecutable = Path.Combine(virtualEnvDirectory, "Scripts", "python.exe");

            // Path to the Python script you want to run
            string pythonScriptPath = Path.Combine(currentDirectory.FullName, "BH.ML", "b_hire.py");

            // Input data to be passed to Python script
            string inputData = Data;
            inputData = "\"" + inputData + "\"";

            // Set environment variables to mimic virtual environment activation
            Environment.SetEnvironmentVariable("PATH", $"{Path.Combine(virtualEnvDirectory, "Scripts")};{Environment.GetEnvironmentVariable("PATH")}");

            var processStartInfo = new ProcessStartInfo
            {
                FileName = pythonExecutable,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                Arguments = $"{pythonScriptPath} {inputData}"
            };

            string myString = "";

            using (Process myProcess = new Process { StartInfo = processStartInfo })
            {
                myProcess.Start();

                // Pass input data to the Python script
                using (StreamWriter sw = myProcess.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine(inputData);
                    }
                }

                StreamReader myStreamReader = myProcess.StandardOutput;
                StreamReader errorReader = myProcess.StandardError;

                // Read all lines from the output
                myString = myStreamReader.ReadToEnd();
                string errors = errorReader.ReadToEnd();

                myProcess.WaitForExit();
                myProcess.Close();
            }

            // Clear the environment variables after the process is complete
            Environment.SetEnvironmentVariable("PATH", null);
            return myString;
        }
       

        private static string ProcessPostWindows(string url)
        {
            var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());

            // Path to the virtual environment directory
            string virtualEnvDirectory = Path.Combine(currentDirectory.FullName, "BH.ML", "b_hire");

            // Path to the Python executable inside the virtual environment
            string pythonExecutable = Path.Combine(virtualEnvDirectory, "Scripts", "python.exe");

            // Path to the Python script you want to run
            string pythonScriptPath = Path.Combine(currentDirectory.FullName, "BH.ML", "b_post.py");

            // Input data to be passed to Python script
            string inputData = url;

            // Set environment variables to mimic virtual environment activation
            Environment.SetEnvironmentVariable("PATH", $"{Path.Combine(virtualEnvDirectory, "Scripts")};{Environment.GetEnvironmentVariable("PATH")}");

            var processStartInfo = new ProcessStartInfo
            {
                FileName = pythonExecutable,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                Arguments = $"{pythonScriptPath} {inputData}"
            };

            string myString = "";

            using (Process myProcess = new Process { StartInfo = processStartInfo })
            {
                myProcess.Start();

                // Pass input data to the Python script
                using (StreamWriter sw = myProcess.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine(inputData);
                    }
                }

                StreamReader myStreamReader = myProcess.StandardOutput;
                StreamReader errorReader = myProcess.StandardError;

                // Read all lines from the output
                myString = myStreamReader.ReadToEnd();
                string errors = errorReader.ReadToEnd();

                myProcess.WaitForExit();
                myProcess.Close();
            }

            // Clear the environment variables after the process is complete
            Environment.SetEnvironmentVariable("PATH", null);
            return myString;
        }

        private static string ProcessPostMacOS(string url)
        {
            //url = "\"" + url + "\"";

            var currentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());

            // Path to your virtual environment's activation script (activate or activate.bat)
            string virtualEnvActivateScript = Path.Combine(currentDirectory.FullName, "BH.ML/b_hire/bin/activate");

            // Path to the Python executable inside the virtual environment
            string pythonExecutable = Path.Combine(currentDirectory.FullName, "BH.ML/b_hire/bin/python");

            // Path to the Python script you want to run
            string pythonScriptPath = Path.Combine(currentDirectory.FullName, "BH.ML/b_post.py");

            // Set environment variables to mimic virtual environment activation
            Environment.SetEnvironmentVariable("VIRTUAL_ENV", currentDirectory.FullName); // Mimic VIRTUAL_ENV variable
            Environment.SetEnvironmentVariable("PATH", $"{currentDirectory.FullName};{Environment.GetEnvironmentVariable("PATH")}");

            var processStartInfo = new ProcessStartInfo
            {
                FileName = pythonExecutable,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                Arguments = $"{pythonScriptPath} {url}"
            };

            string myString = "";

            using (Process myProcess = new Process { StartInfo = processStartInfo })
            {
                myProcess.Start();

                // Pass input data to the Python script
                using (StreamWriter sw = myProcess.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        sw.WriteLine(url);
                    }
                }

                StreamReader myStreamReader = myProcess.StandardOutput;
                StreamReader errorReader = myProcess.StandardError;

                // Read all lines from the output
                myString = myStreamReader.ReadToEnd();
                string errors = errorReader.ReadToEnd();

                myProcess.WaitForExit();
                myProcess.Close();

                //Console.WriteLine("Value received from script:\n" + myString);
            }

            // Clear the environment variables after the process is complete
            Environment.SetEnvironmentVariable("VIRTUAL_ENV", null);
            Environment.SetEnvironmentVariable("PATH", null);
            return myString;

        }
        public static string ProcessPost(string url)
        {
            PlatformID platform = Environment.OSVersion.Platform;

            string result = string.Empty;

            switch (platform)
            {
                case PlatformID.Win32NT:
                case PlatformID.Win32Windows:
                case PlatformID.Win32S:
                    result = ProcessPostWindows(url);
                    // Perform actions specific to Windows
                    break;

                case PlatformID.Unix:
                    result = ProcessPostMacOS(url);
                    // Perform actions specific to Unix-like OS
                    break;

                case PlatformID.MacOSX:
                    result = ProcessPostMacOS(url);
                    // Perform actions specific to macOS
                    break;

                default:
                    break;
            }
            return result;
            
        }

        public static string ProccessCV(string Data)
        {
            PlatformID platform = Environment.OSVersion.Platform;

            string result = string.Empty;

            switch (platform)
            {
                case PlatformID.Win32NT:
                case PlatformID.Win32Windows:
                case PlatformID.Win32S:
                    result = ProcessCVWindows(Data);
                    // Perform actions specific to Windows
                    break;

                case PlatformID.Unix:
                    result = ProcessCVMacOS(Data);
                    // Perform actions specific to Unix-like OS
                    break;

                case PlatformID.MacOSX:
                    result = ProcessCVMacOS(Data);
                    // Perform actions specific to macOS
                    break;

                default:
                    break;
            }
            return result;


        }
    }
}
