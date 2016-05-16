@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"C:\Ruby22\bin\ruby.exe" "D:/worspaces/sanjaymeenaio/sanjaymeena.github.io/_vendor/bundle/ruby/2.2.0/bin/listen" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"C:\Ruby22\bin\ruby.exe" "%~dpn0" %*
